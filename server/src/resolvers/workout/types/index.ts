import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class YearlyWorkoutsAmountResponse {
  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Number, { nullable: true })
  amount?: number;
}

@ObjectType()
class Muscles {
  @Field(() => String)
  muscleName: string;

  @Field(() => Number)
  amount: number;
}

@ObjectType()
export class DataForMuscleHeatmap {
  @Field(() => [Muscles], { nullable: true })
  primaryMuscles?: Muscles;

  @Field(() => [Muscles], { nullable: true })
  secondaryMuscles?: Muscles;
}

@InputType()
export class SetInput {
  @Field(() => Number)
  set: number;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  reps: number;
}

@InputType()
export class ExercisesInput {
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
export class CreateWorkoutInput {
  @Field(() => String)
  date: string;

  @Field(() => String)
  name: string;

  @Field(() => [ExercisesInput])
  exercises: ExercisesInput[];
}

@InputType()
export class GQLExerciseSet {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  reps: number;

  @Field(() => Number)
  weight: number;
}

@InputType()
export class GQLNewExerciseSet {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  set: number;

  @Field(() => String)
  workoutExerciseId: string;

  @Field(() => Number)
  reps: number;

  @Field(() => Number)
  weight: number;
}

@InputType()
export class UpdateExerciseSets {
  @Field(() => [GQLExerciseSet])
  exerciseSets: GQLExerciseSet[];

  @Field(() => [GQLNewExerciseSet], { nullable: true })
  newExerciseSets?: GQLNewExerciseSet[];

  @Field(() => String)
  workoutId: string;
}

@InputType()
export class AddNewExercisesToTheWorkoutInput {
  @Field(() => [ExercisesInput])
  exercises: ExercisesInput[];
}
