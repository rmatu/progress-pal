import moment from "moment";
import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Between, getRepository } from "typeorm";
import { WorkoutExercise } from "../../entities/WorkoutExercise";
import { CommonExercise } from "../../entities/CommonExercise";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { UserExercise } from "../../entities/UserExercise";
import {
  GetExerciseChartDataInput,
  GetExerciseChartDataResponse,
  getExerciseInfoResponse,
} from "./types";

@Resolver(WorkoutExercise)
export class WorkoutExerciseResolver {
  // ===========================
  // ========= QUERYS ==========
  // ===========================
  @Query(() => GetExerciseChartDataResponse)
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
          updatedAt: "ASC",
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

      const weightSetChartData: { date: string; sets: number[] }[] = [];
      const maxWeightChartData: { maxWeight: number; date: string }[] = [];
      const volumeChartData: { volume: number; date: string }[] = [];

      workoutExercises.forEach(exercise => {
        let volume = 0;
        let maxWeight = 0;
        const unOrganizedSets: { set: number; weight: number }[] = [];

        //@ts-ignore
        exercise.exerciseSet.forEach(set => {
          // volumeChartData
          volume = volume + set.reps * set.weight;

          // maxWeightChartData
          if (set.weight > maxWeight) {
            maxWeight = set.weight;
          }

          unOrganizedSets.push({ set: set.set, weight: set.weight / 1000 });
        });

        const organized = unOrganizedSets.sort((a, b) => a.set - b.set);
        const sets = organized.map(el => el.weight);

        // return weights in kg
        volume /= 1000;
        maxWeight /= 1000;

        maxWeightChartData.push({
          maxWeight,
          date: moment(exercise.updatedAt).format("DD-MM-YY"),
        });

        volumeChartData.push({
          volume,
          date: moment(exercise.updatedAt).format("DD-MM-YY"),
        });

        weightSetChartData.push({
          sets,
          date: moment(exercise.updatedAt).format("DD-MM-YY"),
        });
      });

      return { volumeChartData, maxWeightChartData, weightSetChartData };
    } catch (e) {
      console.log(e);
      return new Error("No exercises");
    }
  }

  @Query(() => getExerciseInfoResponse)
  @UseMiddleware(isAuthenticated)
  async getExerciseInfo(
    @Arg("exerciseId") exerciseId: string,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;
    try {
      const commonExerciseRepo = await getRepository(CommonExercise);

      // This is most likely commonExercise
      const commonExercise = await commonExerciseRepo.findOne(exerciseId);
      if (commonExercise) return commonExercise;

      // If it's not commonExercise try userExercise
      const userExerciseRepo = await getRepository(UserExercise);
      const userExercise = await userExerciseRepo.findOne({
        where: {
          id: exerciseId,
          user: userId,
        },
      });
      if (userExercise) return userExercise;

      return new Error("This exercise does not exist");
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
