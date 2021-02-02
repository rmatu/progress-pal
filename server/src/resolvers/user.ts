import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  Root,
  FieldResolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../constants";
import { redis } from "../redis";
import { sendEmail } from "../utils/sendEmail";
import { createResetPasswordEmail, createVerificationEmail } from "../emails";
import { createUrl } from "../utils/createUrl";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return "";
  }

  @Mutation(() => User)
  async sendVerifyEmail(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne(req.session.userId);

    if (!user) {
      return null;
    }

    const emailObject = createVerificationEmail(
      email,
      await createUrl(user?.id, "email-confirm")
    );

    await sendEmail(emailObject);

    return user;
  }

  @Mutation(() => Boolean)
  async sendResetPasswordEmail(@Arg("email") email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    const emailObject = createResetPasswordEmail(
      email,
      await createUrl(user?.id, "reset-password")
    );

    await sendEmail(emailObject);

    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("password") password: string,
    @Arg("token") token: string
  ): Promise<UserResponse> {
    const userId = await redis.get(token);

    if (!userId) {
      return {
        errors: [
          {
            field: "",
            message: "Request expired",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(password);

    await User.update(
      { id: parseInt(userId, 10) },
      { password: hashedPassword }
    );

    const user = await User.findOne(userId);

    return { user };
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { emailVerified: true });
    await redis.del(token);

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async signUp(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      console.log(err.detail);
      if (err.detail.includes("email")) {
        return {
          errors: [
            {
              field: "email",
              message: "Email already taken",
            },
          ],
        };
      }
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username already taken",
            },
          ],
        };
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    const emailObject = createVerificationEmail(
      options.email,
      await createUrl(user?.id, "email-confirm")
    );

    // sending the verification email
    await sendEmail(emailObject);

    return { user };
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user && usernameOrEmail.includes("@")) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That email doesn't exist",
          },
        ],
      };
    }

    // We know that at this point the user has to passed the username
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    // Setting the cookie
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
