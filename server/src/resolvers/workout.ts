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
import { Exercise } from "src/entities/Exercise";
import { getConnection } from "typeorm";

@ObjectType()
class CreateWorkoutResponse {
  @Field(() => Workout, { nullable: true })
  workout?: Workout;
}

@InputType()
class SetInput {
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

    const workouts = await Workout.find({ where: { user: userId } });

    if (!workouts) {
      return null;
    }

    return workouts;
  }

  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  // workout -> exercises -> muscles

  @Mutation(() => CreateWorkoutResponse, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async createWorkout(
    @Arg("input") input: CreateWorkoutInput,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    const connection = await getConnection();

    const muscles = input.exercises.map(exercise => exercise.muscles);

    const exercises = input.exercises.map(exercise => {});

    console.log({ exercises });

    const workoutRepository = await connection;

    return null;
  }
}
