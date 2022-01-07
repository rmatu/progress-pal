import { Field, InputType, ObjectType } from "type-graphql";

// ===========================
// ======= InputTypes ========
// ===========================
@InputType()
export class GetExerciseChartDataInput {
  @Field(() => String)
  exerciseId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}

@InputType()
export class GetMuscleBarChartDataInput {
  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}

// ===========================
// ====== ObjectTypes ========
// ===========================
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
export class GetExerciseInfoResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  primaryMuscles: string[];

  @Field(() => [String])
  secondaryMuscles: string[];

  @Field(() => [String], { nullable: true })
  instructions?: string[];

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

@ObjectType()
class MuslceBarChartObjects {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  volume: number;
}

@ObjectType()
export class GetMuscleBarChartDataResponse {
  @Field(() => [MuslceBarChartObjects])
  muscleBarChartData: MuslceBarChartObjects[];
}
