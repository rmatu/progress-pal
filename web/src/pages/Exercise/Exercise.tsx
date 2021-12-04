import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MaxWeightChart from "../../components/Charts/MaxWeightChart/MaxWeightChart";
import VolumeChart from "../../components/Charts/VolumeChart/VolumeChart";
import WeightSetChart from "../../components/Charts/WeightSetChart/WeightSetChart";
import { ReactComponent as CalendarSVG } from "../../assets/svg/calendar.svg";
import {
  useGetExerciseChartDataLazyQuery,
  useGetExerciseInfoLazyQuery,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { CalendarWrapper, ChartWrapper, DateWrapper } from "./styles";
import Loader from "../../components/UI/Loader/Loader";
import { Heading } from "../../components/UI";
import DateRangePickerModal from "../../components/UI/DateRangePickerModal/DateRangePickerModal";
import { getDateXMonthsBefore } from "../../utils/dateHelpers";

interface ExerciseProps {}

const Exercise: React.FC<ExerciseProps> = ({}) => {
  const [getExerciseChartData, { data: exerciseChartData }] =
    useGetExerciseChartDataLazyQuery();

  const [
    getExerciseInfo,
    {
      data: exerciseInfo,
      loading: exerciseInfoLoading,
      error: exerciseInfoError,
    },
  ] = useGetExerciseInfoLazyQuery();

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const { data: userData } = useMeQuery();
  const { id: exerciseId } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  // Data for Selecting time in Calendar Modal
  // Start date -> 1st day 3 months from today
  const [calendarData, setCalendarData] = useState([
    {
      startDate: getDateXMonthsBefore(new Date(), 1, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const ex = exerciseInfo?.getExerciseInfo;

  const handleCalendarClick = () => setShowModal(true);

  const handleSelectDates = () => {
    getExerciseChartData({
      variables: {
        input: {
          exerciseId,
          endTime: calendarData[0].endDate.toString(),
          startTime: calendarData[0].startDate.toString(),
        },
      },
    });
  };

  useEffect(() => {
    if (!exerciseId) return;

    getExerciseInfo({
      variables: {
        exerciseId,
      },
    });

    // get data from 30 days
    getExerciseChartData({
      variables: {
        input: {
          exerciseId,
          endTime: moment().toString(),
          startTime: getDateXMonthsBefore(new Date(), 1, 1).toString(),
        },
      },
    });
  }, [exerciseId]);

  if (exerciseInfoLoading && !exerciseInfoError) {
    return (
      <DashbordLayoutHOC user={userData?.me}>
        <RightContent open={open}>
          <Loader layoutLoaderUI />
        </RightContent>
      </DashbordLayoutHOC>
    );
  }

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <CalendarWrapper>
          <Heading size="h1">{ex?.name}</Heading>
          <CalendarSVG onClick={handleCalendarClick} />
        </CalendarWrapper>
        <DateWrapper>
          <p>Selected Time: </p>
          {moment(calendarData[0].startDate).format("DD-MM-YYYY")} -{" "}
          {moment(calendarData[0].endDate).format("DD-MM-YYYY")}
        </DateWrapper>
        <ChartWrapper>
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
          <VolumeChart
            data={
              exerciseChartData?.getExerciseChartData.volumeChartData as any
            }
          />
        </ChartWrapper>
      </RightContent>
      <DateRangePickerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        heatmapData={calendarData}
        setHeatmapData={setCalendarData}
        handleFinish={handleSelectDates}
      />
    </DashbordLayoutHOC>
  );
};
export default Exercise;
