import moment from "moment";
import { MyContext } from "../../types";
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
import {
  AddNewExercisesToTheWorkoutInput,
  CreateWorkoutInput,
  DataForMuscleHeatmap,
  UpdateExerciseSets,
  UpdateGeneralWorkoutInfoInput,
  YearlyWorkoutsAmountResponse,
} from "./types";

@Resolver(UserMetrics)
export class WorkoutResolver {
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

  @Query(() => [Workout], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getUserWorkouts(
    @Ctx() { req }: MyContext,
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
  ) {
    const workoutRepo = await getRepository(Workout);

    // Between clause wouldn't include these dates so we need to extend them
    const cStartDate = moment(startDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const cEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

    const { userId } = req.session;

    const workout = await workoutRepo.find({
      relations: [
        "workoutExercise",
        "workoutExercise.commonExercise",
        "workoutExercise.userExercise",
        "workoutExercise.exerciseSet",
      ],
      order: {
        createdAt: "DESC",
      },
      where: { user: userId, updatedAt: Between(cStartDate, cEndDate) },
    });

    if (!workout) {
      return null;
    }

    return workout;
  }

  @Query(() => Workout, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getUserWorkout(
    @Arg("workoutId") workoutId: string,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    const workoutRepo = await getRepository(Workout);

    const workout = await workoutRepo.findOne({
      relations: [
        "workoutExercise",
        "workoutExercise.commonExercise",
        "workoutExercise.userExercise",
        "workoutExercise.exerciseSet",
      ],
      where: { id: workoutId, user: userId },
    });

    if (!workout) {
      return null;
    }

    // Sorting nested relations in typeORM is super hard, so I'm sorting it on the server
    // Sort ASC
    // The newest
    workout.workoutExercise = workout?.workoutExercise
      //@ts-ignore
      .map(el => el)
      .sort((a: WorkoutExercise, b: WorkoutExercise) => {
        if (moment(a.updatedAt).unix() > moment(b.updatedAt).unix()) {
          return 1;
        }
        if (moment(a.updatedAt).unix() < moment(b.updatedAt).unix()) {
          return -1;
        }
        return 0;
      });

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

  @Query(() => DataForMuscleHeatmap, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getDataForMuscleHeatmap(
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
    const workouts = await workoutRepo.find({
      relations: [
        "workoutExercise",
        "workoutExercise.commonExercise",
        "workoutExercise.userExercise",
      ],
      where: {
        user: userId,
        updatedAt: Between(cStartDate, cEndDate),
      },
    });

    // Get primary and secondary muscles from this data
    // Nested entities are returned as arrays by typeORM,
    // so we need to access data like that
    const data = workouts.map((workout: any) => ({
      commonExercisePrimaryMuscles: [
        ...workout.workoutExercise.map(
          (el: any) => el.commonExercise?.primaryMuscles,
        ),
      ],
      commonExerciseSecondaryMuscles: [
        ...workout.workoutExercise.map(
          (el: any) => el.commonExercise?.secondaryMuscles,
        ),
      ],
      userExercisePrimaryMuscles: [
        ...workout.workoutExercise.map(
          (el: any) => el.userExercise?.primaryMuscles,
        ),
      ],
      userExerciseSecondaryMuscles: [
        ...workout.workoutExercise.map(
          (el: any) => el.userExercise?.secondaryMuscles,
        ),
      ],
    }));

    const primaryMusclesData: { [key: string]: number } = {};
    const secondaryMusclesData: { [key: string]: number } = {};

    data.forEach(muscles => {
      muscles.commonExercisePrimaryMuscles?.forEach((muscleName: string) => {
        if (!primaryMusclesData[muscleName]) {
          primaryMusclesData[muscleName] = 1;
        } else {
          primaryMusclesData[muscleName] = primaryMusclesData[muscleName] + 1;
        }
      });

      muscles.commonExerciseSecondaryMuscles?.forEach((muscleName: string) => {
        if (!secondaryMusclesData[muscleName]) {
          secondaryMusclesData[muscleName] = 1;
        } else {
          secondaryMusclesData[muscleName] =
            secondaryMusclesData[muscleName] + 1;
        }
      });

      muscles.userExercisePrimaryMuscles?.forEach((muscleName: string) => {
        if (!primaryMusclesData[muscleName]) {
          primaryMusclesData[muscleName] = 1;
        } else {
          primaryMusclesData[muscleName] = primaryMusclesData[muscleName] + 1;
        }
      });

      muscles.userExerciseSecondaryMuscles?.forEach((muscleName: string) => {
        if (!secondaryMusclesData[muscleName]) {
          secondaryMusclesData[muscleName] = 1;
        } else {
          secondaryMusclesData[muscleName] =
            secondaryMusclesData[muscleName] + 1;
        }
      });
    });

    const finalData: {
      primaryMuscles: { muscleName: string; amount: number }[];
      secondaryMuscles: { muscleName: string; amount: number }[];
    } = { primaryMuscles: [], secondaryMuscles: [] };

    for (const [key, value] of Object.entries(primaryMusclesData)) {
      finalData.primaryMuscles.push({
        muscleName: key,
        amount: value,
      });
    }

    for (const [key, value] of Object.entries(secondaryMusclesData)) {
      finalData.secondaryMuscles.push({
        muscleName: key,
        amount: value,
      });
    }

    finalData.primaryMuscles = finalData.primaryMuscles.filter(
      el => el.muscleName !== "undefined",
    );
    finalData.secondaryMuscles = finalData.secondaryMuscles.filter(
      el => el.muscleName !== "undefined",
    );

    if (!finalData) {
      return null;
    }

    return finalData;
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

      workout.createdAt = moment(input.date).toDate();

      if (input.endTime) {
        workout.endTime = input.endTime;
      }

      if (input.startTime) {
        workout.startTime = input.startTime;
      }

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
        workoutExercise.user = userId;

        const savedExercise = await queryRunner.manager.save(workoutExercise);

        inputExercise.sets.forEach(async inputSet => {
          const set = new ExerciseSet();

          set.set = inputSet.set;
          set.weight = inputSet.weight * 1000;
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async addNewExercisesToTheWorkout(
    @Arg("input") input: AddNewExercisesToTheWorkoutInput,
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

    try {
      const workoutRepo = await getRepository(Workout);

      const workout = await workoutRepo.findOne({
        relations: [
          "workoutExercise",
          "workoutExercise.commonExercise",
          "workoutExercise.userExercise",
          "workoutExercise.exerciseSet",
        ],
        order: {
          updatedAt: "DESC",
        },
        where: { user: userId, id: input.workoutId },
      });

      if (!workout) return new Error("You are not authorized to do that");

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
        workoutExercise.workout = workout.id;
        const savedExercise = await queryRunner.manager.save(workoutExercise);

        inputExercise.sets.forEach(async inputSet => {
          const set = new ExerciseSet();

          set.set = inputSet.set;
          set.weight = inputSet.weight * 1000;
          set.reps = inputSet.reps;
          //@ts-ignore
          set.workoutExercise = savedExercise.id;

          await queryRunner.manager.save(set);
        });
      }

      // commit transaction now:
      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteWorkout(
    @Arg("workoutId") workoutId: string,
    @Ctx() { req }: MyContext,
  ) {
    try {
      const { userId } = req.session;

      const workoutRepo = await getRepository(Workout);

      const workout = await workoutRepo.find({ id: workoutId, user: userId });

      if (!workout) {
        return false;
      }

      await workoutRepo.delete({ id: workoutId });
    } catch {
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async updateExerciseSets(
    @Arg("input") input: UpdateExerciseSets,
    @Ctx() { req }: MyContext,
  ) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      const { userId } = req.session;

      // establish real database connection using our new query runner
      await queryRunner.connect();

      // lets now open a new transaction:
      await queryRunner.startTransaction();

      const exerciseSetsRepo = await getRepository(ExerciseSet);
      const workoutRepo = await getRepository(Workout);

      // Get user workout base by workoutID
      // and check if user is owner of this workout
      const workout = await workoutRepo.findOne({
        relations: [
          "workoutExercise",
          "workoutExercise.commonExercise",
          "workoutExercise.userExercise",
          "workoutExercise.exerciseSet",
        ],
        order: {
          updatedAt: "DESC",
        },
        where: { user: userId, id: input.workoutId },
      });

      if (!workout) return false;

      // Push ids of sets associated with the workout
      const ids: string[] = [];
      //@ts-ignore
      workout.workoutExercise.forEach(el => {
        el.exerciseSet.forEach((set: ExerciseSet) => {
          ids.push(set.id);
        });
      });

      // Check if user is owner of input sets
      let owner = true;
      input.exerciseSets.every(el => {
        owner = !!ids.find(id => id === el.id);
        if (owner) return true;
        return false;
      });

      if (!owner) return false;

      for (const inputSet of input.exerciseSets) {
        const exerciseSet = await exerciseSetsRepo.findOne({ id: inputSet.id });
        if (!exerciseSet) return;

        exerciseSet.reps = inputSet.reps;
        exerciseSet.weight = inputSet.weight * 1000;

        await queryRunner.manager.save(exerciseSet);
      }

      if (input.newExerciseSets) {
        for (const inputSet of input.newExerciseSets) {
          const exerciseSet = new ExerciseSet();

          exerciseSet.set = inputSet.set;
          exerciseSet.reps = inputSet.reps;
          exerciseSet.weight = inputSet.weight * 1000;

          //@ts-ignore
          exerciseSet.workoutExercise = inputSet.workoutExerciseId;

          await queryRunner.manager.save(exerciseSet);
        }
      }

      // commit transaction now:
      await queryRunner.commitTransaction();
      return true;
    } catch {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
    return false;
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuthenticated)
  async updateGeneralWorkoutInfo(
    @Arg("input") input: UpdateGeneralWorkoutInfoInput,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      const workoutRepo = await getRepository(Workout);
      const exerciseRepo = await getRepository(WorkoutExercise);

      // establish real database connection using our new query runner
      await queryRunner.connect();

      // lets now open a new transaction:
      await queryRunner.startTransaction();
      const workout = await workoutRepo.findOne({
        relations: [
          "workoutExercise",
          "workoutExercise.commonExercise",
          "workoutExercise.userExercise",
          "workoutExercise.exerciseSet",
        ],
        where: { user: userId, id: input.workoutId },
      });

      if (!workout) return new Error("You are not authorized to do that");

      if (input.workoutName) {
        workout.name = input.workoutName;
      }

      if (input.date) {
        workout.createdAt = input.date;
      }

      if (input.startTime) {
        workout.startTime = input.startTime;
      }

      if (input.endTime) {
        workout.endTime = input.endTime;
      }

      // update workoutExercise date
      if (input.date) {
        //@ts-ignore
        workout.workoutExercise.map(async (exercise: WorkoutExercise) => {
          const foundExercise = await exerciseRepo.findOne({
            id: exercise.id,
          });

          if (!foundExercise) return;

          //@ts-ignore
          foundExercise.updatedAt = input.date;
          await queryRunner.manager.save(foundExercise);
        });
      }

      const savedWorkout = await queryRunner.manager.save(workout);

      // Sorting nested relations in typeORM is super hard, so I'm sorting it on the server
      // Sort ASC
      // The newest
      savedWorkout.workoutExercise = workout?.workoutExercise
        //@ts-ignore
        .map(el => el)
        .sort((a: WorkoutExercise, b: WorkoutExercise) => {
          if (moment(a.updatedAt).unix() > moment(b.updatedAt).unix()) {
            return 1;
          }
          if (moment(a.updatedAt).unix() < moment(b.updatedAt).unix()) {
            return -1;
          }
          return 0;
        });

      // commit transaction now:
      await queryRunner.commitTransaction();
      return savedWorkout;
    } catch {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      return new Error("Something went wrong");
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteWorkoutExercise(
    @Arg("workoutExerciseId") workoutExerciseId: string,
    @Arg("workoutId") workoutId: string,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const workoutRepo = await getRepository(Workout);
      const workoutExerciseRepo = await getRepository(WorkoutExercise);

      // Get user workout base by workoutID
      // and check if user is owner of this workout
      const workout = await workoutRepo.findOne({
        relations: [
          "workoutExercise",
          "workoutExercise.commonExercise",
          "workoutExercise.userExercise",
          "workoutExercise.exerciseSet",
        ],
        order: {
          updatedAt: "DESC",
        },
        where: { user: userId, id: workoutId },
      });

      if (!workout) return new Error("You are not authorized to do that");

      // Check if requested workoutExercise belongs to the user that made the request
      //@ts-ignore
      const exist = workout.workoutExercise.find(
        (el: WorkoutExercise) => el.id === workoutExerciseId,
      );

      if (!exist) return new Error("You are noth authorized to do that");

      await workoutExerciseRepo.delete(workoutExerciseId);

      return true;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
