import { isAuthenticated } from "../middleware/isAuthenticated";
import { UserMetrics } from "../entities/UserMetrics";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { Exercise } from "../entities/Exercise";
import { ExerciseSet } from "../entities/ExerciseSet";
import { Muscle } from "../entities/Muscle";
import { getConnection } from "typeorm";

@ObjectType()
class CreateWorkoutResponse {
  @Field(() => Workout, { nullable: true })
  workout?: Workout;
}

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
  name: string;

  @Field(() => [String])
  muscles: string[];

  @Field(() => [SetInput])
  sets: SetInput[];
}

@InputType()
class CreateWorkoutInput {
  @Field(() => Date)
  date: Date;

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
  async getUserWorkouts(@Ctx() { req }: MyContext) {
    const { userId } = req.session;

    const workouts = await Workout.find({
      where: { user: userId },
      relations: ["exercise"],
    });

    if (!workouts) {
      return null;
    }

    return workouts;
  }

  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  // workout -> exercises -> muscles

  //! THIS SHOULD RUN IN ONE QUERY!!
  //! IT'S SUPER SLOW NOW
  @Mutation(() => CreateWorkoutResponse, { nullable: true })
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

    try {
      const workout = new Workout();
      workout.user = userId;

      // await queryRunner.manager.save(workout);
      const savedWorkout = await queryRunner.manager.save(workout);

      for (const inputExercise of input.exercises) {
        const exercise = new Exercise();
        exercise.name = inputExercise.name;
        //@ts-ignore
        exercise.workout = savedWorkout.id;
        const savedExercise = await queryRunner.manager.save(exercise);

        inputExercise.sets.forEach(async inputSet => {
          const set = new ExerciseSet();
          set.set = inputSet.set;
          set.weight = inputSet.weight;
          set.reps = inputSet.reps;
          //@ts-ignore
          set.exercise = savedExercise.id;

          await queryRunner.manager.save(set);
        });

        inputExercise.muscles.forEach(async name => {
          const muscle = new Muscle();
          muscle.name = name;
          //@ts-ignore
          muscle.exercise = savedExercise.id;

          await queryRunner.manager.save(muscle);
        });
      }

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return null;
  }
}
