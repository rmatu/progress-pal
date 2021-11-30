import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class GetExerciseChartDataInput {
  @Field(() => String)
  exerciseId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}

@ObjectType()
export class MaxWeightChartData {
  @Field(() => String)
  date: string;

  @Field(() => Number)
  maxWeight: number;
}

@ObjectType()
export class VolumeChartData {
  @Field(() => String)
  date: string;

  @Field(() => Number)
  volume: number;
}

@ObjectType()
export class WeightSetChartData {
  @Field(() => String)
  date: string;

  @Field(() => [Number])
  sets: number[];
}

@ObjectType()
export class GetExerciseChartDataResponse {
  @Field(() => [MaxWeightChartData])
  maxWeightChartData: MaxWeightChartData[];

  @Field(() => [VolumeChartData])
  volumeChartData: VolumeChartData[];

  @Field(() => [WeightSetChartData])
  weightSetChartData: WeightSetChartData[];
}
