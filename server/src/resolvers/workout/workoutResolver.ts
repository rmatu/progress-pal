import moment from "moment";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Between, getConnection, getRepository } from "typeorm";
import { ExerciseSet } from "../../entities/ExerciseSet";
import { UserMetrics } from "../../entities/UserMetrics";
import { Workout } from "../../entities/Workout";
import { WorkoutExercise } from "../../entities/WorkoutExercise";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { CreateWorkoutInput, YearlyWorkoutsAmountResponse } from "./types";

@Resolver(UserMetrics)
export class WorkoutResolver {
  // ===========================
  // ====== FIELD RESOLVERS ====
  // ===========================
  // ===========================
  // ========= QUERYS ==========
  // ===========================

  @Query(() => [Workout], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getAllUserWorkouts(@Ctx() { req }: MyContext) {
    const workoutRepo = await getRepository(Workout);

    const { userId } = req.session;

    const workout = await workoutRepo.find({
      relations: [
        "workoutExercise",
        "workoutExercise.commonExercise",
        "workoutExercise.userExercise",
        "workoutExercise.exerciseSet",
      ],
      where: { user: userId },
    });

    if (!workout) {
      return null;
    }

    return workout;
  }

  @Query(() => Workout, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getUserWorkout(@Arg("workoutId") workoutId: number) {
    const workoutRepo = await getRepository(Workout);

    const workout = await workoutRepo.findOne({
      relations: [
        "workoutExercise",
        "workoutExercise.commonExercise",
        "workoutExercise.userExercise",
        "workoutExercise.exerciseSet",
      ],
      where: { id: workoutId },
    });

    if (!workout) {
      return null;
    }

    return workout;
  }

  @Query(() => [YearlyWorkoutsAmountResponse], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getUserYearlyWorkoutData(
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
    @Ctx() { req }: MyContext,
  ) {
    const workoutRepo = await getRepository(Workout);
    const { userId } = req.session;

    // Between clause wouldn't include these dates so we need to extend them
    const cStartDate = moment(startDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const cEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

    // Get all workouts
    const workout = await workoutRepo.find({
      relations: ["workoutExercise"],
      where: {
        user: userId,
        updatedAt: Between(cStartDate, cEndDate),
      },
    });

    // Format the dates
    const dates = workout.map(el => moment(el.updatedAt).format("YYYY-MM-DD"));

    // Date here will look like this
    // {YYYY-MM-DD: number}
    // {"2021-11-03": 10}
    const map = dates.reduce(
      (
        prev: {
          [key: string]: number;
        },
        cur: string,
      ) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      },
      {},
    );

    const data = [];
    for (const [key, value] of Object.entries(map)) {
      data.push({
        date: key,
        amount: value,
      });
    }

    if (!data) {
      return null;
    }

    return data;
  }

  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  @Mutation(() => Workout, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async createWorkout(
    @Arg("input") input: CreateWorkoutInput,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    const workout = new Workout();

    try {
      workout.user = userId;
      workout.name = input.name || moment().format(`[Workout] DD-MM-YYYY`);

      const savedWorkout = await queryRunner.manager.save(workout);

      for (const inputExercise of input.exercises) {
        const workoutExercise = new WorkoutExercise();

        if (inputExercise.isCommonExercise) {
          // @ts-ignore
          workoutExercise.commonExercise = inputExercise.id;
        } else {
          // @ts-ignore
          workoutExercise.userExercise = inputExercise.id;
        }

        // @ts-ignore
        workoutExercise.workout = savedWorkout.id;
        const savedExercise = await queryRunner.manager.save(workoutExercise);

        inputExercise.sets.forEach(async inputSet => {
          const set = new ExerciseSet();
          set.set = inputSet.set;
          set.weight = inputSet.weight;
          set.reps = inputSet.reps;
          //@ts-ignore
          set.workoutExercise = savedExercise.id;

          await queryRunner.manager.save(set);
        });
      }

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }

    return workout;
  }
}
