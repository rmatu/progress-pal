import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuscleBarChart from "../../../components/Charts/MuscleBarChart/MuscleBarChart";
import UserWeightChart from "../../../components/Charts/UserWeightChart/UserWeightChart";
import DashboardExercisesList from "../../../components/DashboardExercisesList/DashboardExercisesList";
import { FlexWrapperDiv } from "../../../components/FlexElements";
import MuscleHeatmapModel from "../../../components/UI/MuscleHeatmapModel/MuscleHeatmapModel";
import WorkoutCard from "../../../components/UI/WorkoutsList/WorkoutCard/WorkoutCard";
import YearlyCalendarHeatmap from "../../../components/UI/YearlyCalendarHeatmap/YearlyCalendarHeatmap";
import { MAIN_PAGE } from "../../../constants/routes";
import {
  MeQuery,
  useGetUserLastWorkoutQuery,
  useGetUserYearlyWorkoutDataLazyQuery,
  Workout,
} from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../../hoc/styles";
import { useWindowResize } from "../../../hooks/useWindowResize";
import * as navActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import { AppState } from "../../../redux/rootReducer";
import { RightContentWrapper, Row } from "./styles";

interface DashboardProps {
  user: MeQuery["me"] | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [
    getAllUserYearlyWorkoutData,
    { data: calendarData, loading: loadingCalendarData },
  ] = useGetUserYearlyWorkoutDataLazyQuery();
  const { data: userLastWorkout, loading: userLastWorkoutLoading } =
    useGetUserLastWorkoutQuery();

  // Whole year data for calendar
  const [startDate, setStartDate] = useState(
    moment().set({ month: 0, date: 1 }).format("YYYY-MM-DD"),
  );

  const [endDate, setEndDate] = useState(
    moment().set({ month: 11, date: 31 }).format("YYYY-MM-DD"),
  );

  const width = useWindowResize();
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navActions.changeItem(MAIN_PAGE));
  }, []);

  // Data for this page
  useEffect(() => {
    const startDate = moment().set({ month: 0, date: 1 }).format("YYYY-MM-DD");
    const endDate = moment().set({ month: 11, date: 31 }).format("YYYY-MM-DD");

    getAllUserYearlyWorkoutData({
      variables: {
        startDate,
        endDate,
      },
    });
  }, []);

  useEffect(() => {
    if (width < 600) {
      setStartDate(moment(startDate).set("month", 6).format("YYYY-MM-DD"));
    } else {
      setStartDate(moment(startDate).set("month", 0).format("YYYY-MM-DD"));
    }
  }, [width]);

  return (
    <DashbordLayoutHOC user={user}>
      <RightContent open={open}>
        <RightContentWrapper>
          <FlexWrapperDiv flexDirection="row">
            <FlexWrapperDiv flexDirection="column">
              <YearlyCalendarHeatmap
                endDate={endDate}
                loadingCalendarData={loadingCalendarData}
                getAllUserYearlyWorkoutData={getAllUserYearlyWorkoutData}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
                values={calendarData?.getUserYearlyWorkoutData}
              />
              <Row>
                <MuscleHeatmapModel />
                <WorkoutCard
                  workout={userLastWorkout?.getUserLastWorkout as Workout}
                  dashboardLayout
                  loading={userLastWorkoutLoading}
                />
              </Row>
            </FlexWrapperDiv>
            <MuscleBarChart />
          </FlexWrapperDiv>
          <FlexWrapperDiv flexDirection="row">
            <Row id="bottomRow">
              <UserWeightChart version="gradient" />
              <DashboardExercisesList />
            </Row>
          </FlexWrapperDiv>
        </RightContentWrapper>
      </RightContent>
    </DashbordLayoutHOC>
  );
};

export default Dashboard;
