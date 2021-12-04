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

@ObjectType()
export class getExerciseInfoResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  primaryMuscles: string[];

  @Field(() => [String])
  secondaryMuscles: string[];

  @Field(() => [String])
  instructions: string[];

  @Field(() => String, { nullable: true })
  force?: string;

  @Field(() => String, { nullable: true })
  level: string;

  @Field(() => String, { nullable: true })
  mechanic?: string;

  @Field(() => String, { nullable: true })
  equipment?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => Boolean)
  isCommonExercise: boolean;
}
