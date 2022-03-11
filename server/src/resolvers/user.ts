import { isAuthenticated } from "../middleware/isAuthenticated";
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
  UseMiddleware,
  InputType,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { UserMetrics } from "../entities/UserMetrics";
import argon2 from "argon2";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { COOKIE_NAME, onboardingSteps } from "../constants";
import { redis } from "../redis";
import { sendEmail } from "../utils/sendEmail";
import {
  createThirdPartySignUpEmail,
  createResetPasswordEmail,
  createVerificationEmail,
} from "../emails";
import { createUrl } from "../utils/createUrl";
import { checkIfObjectHasValue } from "../utils/objectUtils";

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

@ObjectType()
class GetAccountPageDataResponse {
  @Field(() => UserMetrics, { nullable: true })
  userMetrics?: UserMetrics;

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UpdateUserDataInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  weightGoal: string;

  @Field(() => String)
  activityLevel: string;
}

@Resolver(User)
export class UserResolver {
  // ===========================
  // ====== FIELD RESOLVERS ====
  // ===========================

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return "";
  }

  // ===========================
  // ========= QUERYS ==========
  // ===========================

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne(req.session.userId);

    if (!user) {
      return null;
    }

    return await User.findOne(req.session.userId);
  }

  @Query(() => GetAccountPageDataResponse, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getAccountPageData(@Ctx() { req }: MyContext) {
    const user = await User.findOne(req.session.userId);
    const userMetrics = await UserMetrics.findOne({
      where: {
        user: req.session.userId,
      },
      order: {
        updatedAt: "DESC",
      },
    });

    if (!user) {
      return null;
    }

    if (!userMetrics) {
      return null;
    }

    return {
      user,
      userMetrics,
    };
  }

  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  @Mutation(() => User)
  async sendVerifyEmail(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
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
      await createUrl(user?.id, "email-confirm"),
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
      await createUrl(user?.id, "reset-password"),
    );

    await sendEmail(emailObject);

    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("password") password: string,
    @Arg("token") token: string,
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
      { password: hashedPassword },
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

  @Mutation(() => UserResponse)
  async signUpWithGoogle(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: email,
          email: email,
          googleRegisetered: true,
          emailVerified: true,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      console.log(err.detail);
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    const emailObject = createThirdPartySignUpEmail(email);

    await sendEmail(emailObject);

    return { user };
  }

  @Mutation(() => UserResponse)
  async signUpWithFacebook(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: email,
          email: email,
          facebookRegisetered: true,
          emailVerified: true,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      console.log(err.detail);
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    const emailObject = createThirdPartySignUpEmail(email);

    await sendEmail(emailObject);

    return { user };
  }

  @Mutation(() => UserResponse)
  async signUp(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
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
      await createUrl(user?.id, "email-confirm"),
    );

    // sending the verification email
    await sendEmail(emailObject);

    return { user };
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } },
    );

    // This email is associated with registered with Google button
    if (user?.googleRegisetered) {
      return {
        errors: [
          {
            field: "Popup",
            message: "Use the Google Button to sign in with this email",
          },
        ],
      };
    }

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

  @Mutation(() => UserResponse)
  async signInWithGoogle(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    // If there is no user register at this email, create a new one
    if (!user) {
      let newUser;

      try {
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username: email,
            email: email,
            googleRegisetered: true,
            emailVerified: true,
          })
          .returning("*")
          .execute();
        newUser = result.raw[0];
      } catch (err) {
        console.log(err.detail);
        return {
          errors: [
            {
              field: "Popup",
              message: "There was some error when logging to this account.",
            },
          ],
        };
      }

      // store user id session
      // this will set a cookie on the user
      // keep them logged in
      req.session.userId = newUser.id;

      const emailObject = createThirdPartySignUpEmail(email);

      await sendEmail(emailObject);

      return { user: newUser };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async signInWithFacebook(
    @Arg("email") email: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    // If there is no user register at this email, create a new one
    if (!user) {
      let newUser;

      try {
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username: email,
            email: email,
            facebookRegisetered: true,
            emailVerified: true,
          })
          .returning("*")
          .execute();
        newUser = result.raw[0];
      } catch (err) {
        console.log(err.detail);
        return {
          errors: [
            {
              field: "Popup",
              message: "There was some error when logging to this account.",
            },
          ],
        };
      }

      // store user id session
      // this will set a cookie on the user
      // keep them logged in
      req.session.userId = newUser.id;

      const emailObject = createThirdPartySignUpEmail(email);

      await sendEmail(emailObject);

      return { user: newUser };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }

  @Mutation(() => User)
  @UseMiddleware(isAuthenticated)
  async changeOnboardingStep(
    @Ctx() { req }: MyContext,
    @Arg("step") step: number,
  ): Promise<User | null | Error> {
    if (!checkIfObjectHasValue(step, onboardingSteps)) {
      return new Error("There went something wrong due to your onboarding");
    }

    const user = await User.findOne(req.session.userId);

    if (!user) {
      return new Error("This user does not exist");
    }

    user.onboardingStep = step;

    await User.save(user);

    return user;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuthenticated)
  async updateUserData(
    @Ctx() { req }: MyContext,
    @Arg("input") input: UpdateUserDataInput,
  ): Promise<User | null | Error> {
    const user = await User.findOne(req.session.userId);

    if (!user) {
      return new Error("This user does not exist");
    }

    for (const [key, value] of Object.entries(input)) {
      //@ts-ignore
      user[key] = value;
    }

    const updatedUser = await user.save();

    return updatedUser;
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() { req, res }: MyContext) {
    const user = await User.findOne(req.session.userId);

    if (!user) {
      return new Error("This user does not exist");
    }

    await user.delete();

    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }
}
