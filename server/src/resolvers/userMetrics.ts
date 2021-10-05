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

@InputType()
class CreateUserMetricsInput {
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

@ObjectType()
class UpdateOnboardingResponse {
  @Field(() => UserMetrics, { nullable: true })
  userMetrics?: UserMetrics;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(UserMetrics)
export class UserMetricsResolver {
  // ===========================
  // ====== FIELD RESOLVERS ====
  // ===========================

  // ===========================
  // ========= QUERYS ==========
  // ===========================
  @Query(() => [UserMetrics], { nullable: true })
  async getUserMetrics(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const { userId } = req.session;

    const userMetrics = await UserMetrics.find({ where: { user: userId } });

    if (!userMetrics) {
      return null;
    }

    return userMetrics;
  }

  // ===========================
  // ======= MUTATIONS =========
  // ===========================

  @Mutation(() => UpdateOnboardingResponse)
  @UseMiddleware(isAuthenticated)
  async finishOnboarding(
    @Arg("input") input: CreateUserMetricsInput,
    @Ctx() { req }: MyContext,
  ) {
    const userMetrics = UserMetrics.create({
      weightGoal: input.weightGoal,
      activityLevel: input.activityLevel,
      height: input.height,
      weight: input.weight,
      weightGoalValue: input.weightGoalValue,
      user: req.session.userId,
    }).save();

    const user = await User.findOne(req.session.userId);

    if (!user) return null;

    user.birthDate = input.birthDate;
    user.gender = input.gender;

    await User.save(user);

    return { userMetrics, user };
  }
}
