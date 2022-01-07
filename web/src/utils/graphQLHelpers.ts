import {
  GetDataForMuscleHeatmapDocument,
  GetUserYearlyWorkoutDataDocument,
  GetUserWorkoutsDocument,
  GetUserWorkoutDocument,
  GetUserLastWorkoutDocument,
  GetMuscleBarChartDataDocument,
  GetWeightChartDataDocument,
  GetAllCommonExercisesDocument,
} from "./../generated/graphql";
import { DocumentNode } from "graphql";
import moment from "moment";
import { getDateXMonthsBefore } from "./dateHelpers";

type documentNames =
  | "getDataForMuscleHeatmap"
  | "getUserLastWorkout"
  | "getUserYearlyWorkout"
  | "getUserWorkout"
  | "getMuscleBarChartData"
  | "getWeightChartData"
  | "getAllCommonExercises"
  | "getUserWorkouts";

export const createRefetchQueriesArray = (
  documents: documentNames[],
  userVariables?: { [key: string]: any },
) => {
  const refetchQueriesArray: {
    query: DocumentNode;
    variables: {};
  }[] = [];

  documents.forEach(name => {
    if (name === "getDataForMuscleHeatmap") {
      refetchQueriesArray.push({
        query: GetDataForMuscleHeatmapDocument,
        variables: {
          startDate: moment().subtract(14, "days").format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD"),
        },
      });
    } else if (name === "getUserYearlyWorkout") {
      refetchQueriesArray.push({
        query: GetUserYearlyWorkoutDataDocument,
        variables: {
          startDate: moment().set({ month: 0, date: 1 }).format("YYYY-MM-DD"),
          endDate: moment().set({ month: 11, date: 31 }).format("YYYY-MM-DD"),
        },
      });
    } else if (name === "getAllCommonExercises") {
      //@ts-ignore
      refetchQueriesArray.push({
        query: GetAllCommonExercisesDocument,
      });
    } else if (name === "getUserWorkouts") {
      refetchQueriesArray.push({
        query: GetUserWorkoutsDocument,
        variables: {
          startDate: moment(getDateXMonthsBefore(new Date(), 3, 1)).format(
            "YYYY-MM-DD",
          ),
          endDate: moment().format("YYYY-MM-DD"),
        },
      });
    } else if (name === "getWeightChartData") {
      refetchQueriesArray.push({
        query: GetWeightChartDataDocument,
        variables: {
          startDate: moment(getDateXMonthsBefore(new Date(), 3, 1)).format(
            "YYYY-MM-DD",
          ),
          endDate: moment().format("YYYY-MM-DD"),
        },
      });
    } else if (name === "getMuscleBarChartData") {
      refetchQueriesArray.push({
        query: GetMuscleBarChartDataDocument,
        variables: {
          input: {
            startTime: moment(getDateXMonthsBefore(new Date(), 3, 1)).format(
              "YYYY-MM-DD",
            ),
            endTime: moment().format("YYYY-MM-DD"),
          },
        },
      });
    } else if (name === "getUserLastWorkout") {
      refetchQueriesArray.push({
        query: GetUserLastWorkoutDocument,
        variables: {},
      });
    } else if (name === "getUserWorkout") {
      if (!userVariables) return;
      if (!userVariables.workoutId) return;

      refetchQueriesArray.push({
        query: GetUserWorkoutDocument,
        variables: {
          workoutId: userVariables.workoutId,
        },
      });
    }
  });

  return refetchQueriesArray;
};
