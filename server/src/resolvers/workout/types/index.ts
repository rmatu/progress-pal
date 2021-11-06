import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class YearlyWorkoutsAmountResponse {
  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Number, { nullable: true })
  amount?: number;
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
