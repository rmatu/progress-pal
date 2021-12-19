import { isAuthenticated } from "../../middleware/isAuthenticated";
import { UserMetrics } from "../../entities/UserMetrics";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../../entities/User";
import {
  CreateUserMetricsInput,
  UpdateOnboardingResponse,
  UpdateUserMetricsInput,
} from "./types";
import { getRepository } from "typeorm";

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

  @Mutation(() => UserMetrics)
  @UseMiddleware(isAuthenticated)
  async addNewWeight(@Arg("weight") weight: Number, @Ctx() { req }: MyContext) {
    const { userId } = req.session;

    try {
      const userMetricsRepo = await getRepository(UserMetrics);

      // Get the latest user metric
      const userMetrics = await userMetricsRepo.findOne({
        where: { user: userId },
        order: { updatedAt: "DESC" },
      });

      let newUserMetrics;

      if (!userMetrics) {
        newUserMetrics = await UserMetrics.create({
          weight: Number(weight),
        }).save();
      } else {
        newUserMetrics = await UserMetrics.create({
          weightGoal: userMetrics.weightGoal,
          activityLevel: userMetrics.activityLevel,
          height: userMetrics.height,
          weight: Number(weight),
          weightGoalValue: userMetrics.weightGoalValue,
          user: userId,
        }).save();
      }

      return newUserMetrics;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
