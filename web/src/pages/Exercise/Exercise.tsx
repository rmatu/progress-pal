import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MaxWeightChart from "../../components/Charts/MaxWeightChart/MaxWeightChart";
import WeightSetChart from "../../components/Charts/WeightSetChart/WeightSetChart";

import {
  useGetExerciseChartDataLazyQuery,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";

import {} from "./styles";

interface ExerciseProps {}

const Exercise: React.FC<ExerciseProps> = ({}) => {
  const [getExerciseChartData, { data: exerciseChartData }] =
    useGetExerciseChartDataLazyQuery();

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const { data: userData } = useMeQuery();
  const { id: exerciseId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!exerciseId) return;

    // get data from 30 days
    getExerciseChartData({
      variables: {
        input: {
          exerciseId,
          endTime: moment().toString(),
          startTime: moment().subtract({ days: 60 }).toString(),
        },
      },
    });
  }, [exerciseId]);

  console.log(exerciseChartData);

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <WeightSetChart
          data={
            exerciseChartData?.getExerciseChartData.weightSetChartData as any
          }
        />
        <MaxWeightChart
          data={
            exerciseChartData?.getExerciseChartData.maxWeightChartData as any
          }
        />
      </RightContent>
    </DashbordLayoutHOC>
  );
};
export default Exercise;
