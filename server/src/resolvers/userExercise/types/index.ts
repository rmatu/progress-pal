import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserExerciseInput {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  primaryMuscles: string[];

  @Field(() => [String], { nullable: true })
  secondaryMuscles?: string[];

  @Field(() => String)
  force: string;

  @Field(() => String)
  level: string;

  @Field(() => String, { nullable: true })
  mechanic?: string;

  @Field(() => String)
  equipment: string;

  @Field(() => String)
  category: string;

  @Field(() => [String], { nullable: true })
  instructions?: string[];
}

@InputType()
export class UpdateUserExerciseInput {
  @Field(() => String)
  exerciseId: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  primaryMuscles?: string[];

  @Field(() => [String], { nullable: true })
  secondaryMuscles?: string[];

  @Field(() => String, { nullable: true })
  force?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => String, { nullable: true })
  mechanic?: string;

  @Field(() => String, { nullable: true })
  equipment?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => [String], { nullable: true })
  instructions?: string[];
}
