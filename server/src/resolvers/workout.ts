import moment from "moment";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { UserMetrics } from "../entities/UserMetrics";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { Workout } from "../entities/Workout";
import { ExerciseSet } from "../entities/ExerciseSet";
import { getConnection, getRepository } from "typeorm";
import { WorkoutExercise } from "../entities/WorkoutExercise";

@InputType()
class SetInput {
  @Field(() => Number)
  set: number;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  reps: number;
}

@InputType()
class ExercisesInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  isCommonExercise: boolean;

  @Field(() => String)
  name: string;

  @Field(() => [SetInput])
  sets: SetInput[];
}

@InputType()
class CreateWorkoutInput {
  @Field(() => String)
  date: string;

  @Field(() => String)
  name: string;

  @Field(() => [ExercisesInput])
  exercises: ExercisesInput[];
}

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
