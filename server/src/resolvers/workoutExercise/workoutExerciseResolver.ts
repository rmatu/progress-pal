import moment from "moment";
import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Between, getRepository } from "typeorm";
import { WorkoutExercise } from "../../entities/WorkoutExercise";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { GetExerciseChartDataInput } from "./types";

@Resolver(WorkoutExercise)
export class WorkoutExerciseResolver {
  // ===========================
  // ========= QUERYS ==========
  // ===========================
  @Query(() => [WorkoutExercise])
  @UseMiddleware(isAuthenticated)
  async getExerciseChartData(
    @Arg("input") input: GetExerciseChartDataInput,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;
    try {
      const workoutExerciseRepo = await getRepository(WorkoutExercise);

      // Between clause wouldn't include these dates so we need to extend them
      const cStartDate = moment(input.startTime)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      const cEndDate = moment(input.endTime)
        .add(1, "days")
        .format("YYYY-MM-DD");

      const workoutExercises = await workoutExerciseRepo.find({
        relations: ["exerciseSet", "commonExercise", "userExercise"],
        order: {
          updatedAt: "DESC",
        },
        where: [
          {
            user: userId,
            commonExercise: input.exerciseId,
            updatedAt: Between(cStartDate, cEndDate),
          },
          {
            user: userId,
            userExercise: input.exerciseId,
            updatedAt: Between(cStartDate, cEndDate),
          },
        ],
      });

      return workoutExercises;
    } catch (e) {
      console.log(e);
      return new Error("No exercises");
    }
  }
}
