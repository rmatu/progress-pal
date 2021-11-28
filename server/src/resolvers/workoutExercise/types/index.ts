import { Field, InputType } from "type-graphql";

@InputType()
export class GetExerciseChartDataInput {
  @Field(() => String)
  exerciseId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}
