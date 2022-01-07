import { MyContext } from "../types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { UserMetrics } from "../entities/UserMetrics";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { CommonExercise } from "../entities/CommonExercise";
import { UserExercise } from "../entities/UserExercise";

@Resolver(UserMetrics)
export class CommonExerciseResolver {
  // ===========================
  // ====== FIELD RESOLVERS ====
  // ===========================
  // ===========================
  // ========= QUERYS ==========
  // ===========================

  @Query(() => [CommonExercise], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getAllCommonExercises(@Ctx() { req }: MyContext) {
    const { userId } = req.session;

    try {
      const exerciseRepo = await getRepository(CommonExercise);
      const userExerciseRepo = await getRepository(UserExercise);

      const commonExercises = await exerciseRepo.find();
      const userExercises = await userExerciseRepo.find({
        where: { user: userId },
      });

      console.log(userExercises);

      const allExercises = [...commonExercises, ...userExercises];

      return allExercises;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
