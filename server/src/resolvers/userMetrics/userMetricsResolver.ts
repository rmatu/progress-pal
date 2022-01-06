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
  GetWieghtChartDataResponse,
  UpdateOnboardingResponse,
} from "./types";
import { Between, getRepository } from "typeorm";
import moment from "moment";

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

  @Query(() => [GetWieghtChartDataResponse])
  @UseMiddleware(isAuthenticated)
  async getWeightChartData(
    @Arg("startDate") startDate: Date,
    @Arg("endDate") endDate: Date,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;
    try {
      const userMetricsRepo = await getRepository(UserMetrics);

      // Between clause wouldn't include these dates so we need to extend them
      const cStartDate = moment(startDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      const cEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

      const userMetrics = await userMetricsRepo.find({
        where: { user: userId, updatedAt: Between(cStartDate, cEndDate) },
        order: { updatedAt: "ASC" },
      });

      const returnData: { date: string; id: number; weight?: number }[] = [];

      userMetrics.forEach(el => {
        if (!el.weight) return;

        const data: { date: string; id: number; weight?: number } = {
          date: moment(el.updatedAt).format("DD-MM-YY"),
          id: el.id,
          weight: el.weight,
        };

        return returnData.push(data);
      });

      return returnData;
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
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
    const userMetrics = await UserMetrics.create({
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
  async addNewWeight(
    @Arg("weight") weight: number,
    @Arg("date", { nullable: true }) date: Date,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const userMetricsRepo = await getRepository(UserMetrics);

      // Get the latest user metric
      const userMetrics = await userMetricsRepo.findOne({
        where: { user: userId },
        order: { updatedAt: "DESC" },
      });

      let newUserMetrics;

      const variables: { weight: number; updatedAt?: Date } = {
        weight: weight,
      };

      if (date) {
        variables["updatedAt"] = date;
      }

      if (!userMetrics) {
        newUserMetrics = await UserMetrics.create({
          ...variables,
          user: userId,
        }).save();
      } else {
        newUserMetrics = await UserMetrics.create({
          ...variables,
          weightGoal: userMetrics.weightGoal,
          activityLevel: userMetrics.activityLevel,
          height: userMetrics.height,
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

  @Mutation(() => UserMetrics)
  @UseMiddleware(isAuthenticated)
  async deleteWeight(
    @Arg("weightId") weightId: number,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const userMetricsRepo = await getRepository(UserMetrics);

      // Get the latest user metric
      const userMetrics = await userMetricsRepo.findOne({
        where: { user: userId, id: weightId },
        order: { updatedAt: "DESC" },
      });
      if (!userMetrics)
        return new Error("Invalid ID or you don't own this data");

      //@ts-ignore
      userMetrics.weight = null;

      return await userMetrics.save();
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }

  @Mutation(() => UserMetrics)
  @UseMiddleware(isAuthenticated)
  async updateWeight(
    @Arg("weight") weight: number,
    @Arg("weightId") weightId: number,
    @Arg("date", { nullable: true }) date: Date,
    @Ctx() { req }: MyContext,
  ) {
    const { userId } = req.session;

    try {
      const userMetricsRepo = await getRepository(UserMetrics);

      // Get the latest user metric
      const userMetrics = await userMetricsRepo.findOne({
        where: { user: userId, id: weightId },
      });

      if (!userMetrics) {
        return new Error("This weight does not exist");
      }

      userMetrics.weight = weight;
      if (date) userMetrics.updatedAt = date;

      return await userMetrics.save();
    } catch (e) {
      console.log(e);
      return new Error("Something went wrong");
    }
  }
}
