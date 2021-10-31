import { MyContext } from "../types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { UserMetrics } from "../entities/UserMetrics";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { CommonExercise } from "../entities/CommonExercise";

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
    const exerciseRepo = await getRepository(CommonExercise);

    const workout = await exerciseRepo.find({ take: 10 });

    if (!workout) {
      return null;
    }

    return workout;
  }
}
