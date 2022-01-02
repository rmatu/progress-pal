import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { UserExercise } from "../../entities/UserExercise";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateUserExerciseInput, UpdateUserExerciseInput } from "./types";

@Resolver(UserExercise)
export class UserExerciseResolver {
  // ===========================
  // ====== FIELD RESOLVERS ====
  // ===========================
  // ===========================
  // ========= QUERYS ==========
  // ===========================
  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  @Mutation(() => UserExercise)
  @UseMiddleware(isAuthenticated)
  async createUserExercise(
    @Arg("input") input: CreateUserExerciseInput,

    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      //@ts-ignore
      const userExercise = await UserExercise.create({
        ...input,
        user: userId,
        //@ts-ignore
      }).save();

      return userExercise;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }

  @Mutation(() => UserExercise)
  @UseMiddleware(isAuthenticated)
  async updateUserExercise(
    @Arg("input") input: UpdateUserExerciseInput,

    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const userExerciseRepo = await getRepository(UserExercise);
      const userExercise = await userExerciseRepo.findOne({
        where: { user: userId, id: input.exerciseId },
      });

      if (!userExercise) return new Error("No exercise");

      for (const [key, value] of Object.entries(input)) {
        //@ts-ignore
        userExercise[key] = value;
      }

      const updatedUserExercise = userExercise.save();

      return updatedUserExercise;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }

  @Mutation(() => UserExercise)
  @UseMiddleware(isAuthenticated)
  async deleteUserExercise(
    @Arg("exerciseId") exerciseId: string,

    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const userExerciseRepo = await getRepository(UserExercise);
      const userExercise = await userExerciseRepo.findOne({
        where: { user: userId, id: exerciseId },
      });

      if (!userExercise) return new Error("No exercise");

      await userExerciseRepo.delete(exerciseId);

      return userExercise;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
