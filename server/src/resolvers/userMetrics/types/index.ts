import { UserMetrics } from "../../../entities/UserMetrics";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../../entities/User";

@InputType()
export class CreateUserMetricsInput {
  @Field()
  gender: string;
  @Field()
  weightGoal: string;
  @Field()
  activityLevel: string;
  @Field()
  height: number;
  @Field()
  weight: number;
  @Field()
  weightGoalValue: number;
  @Field()
  birthDate: string;
}

@InputType()
export class UpdateUserMetricsInput {
  @Field()
  gender?: string;
  @Field()
  weightGoal?: string;
  @Field()
  activityLevel?: string;
  @Field()
  height?: number;
  @Field()
  weight?: number;
  @Field()
  weightGoalValue?: number;
  @Field()
  birthDate?: string;
}

@ObjectType()
export class UpdateOnboardingResponse {
  @Field(() => UserMetrics, { nullable: true })
  userMetrics?: UserMetrics;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class GetWieghtChartDataResponse {
  @Field(() => String)
  date: string;

  @Field(() => Number)
  weight: number;
}
