import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme/theme";
import Loader from "../../UI/Loader/Loader";
import { getStrokeColor } from "../strokeColors";
import { CalendarWrapper, Text, Wrapper, LoaderWrapper } from "./styles";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import moment from "moment";
import DateRangePickerModal from "../../UI/DateRangePickerModal/DateRangePickerModal";
import { useGetMuscleBarChartDataLazyQuery } from "../../../generated/graphql";
import { getDateXMonthsBefore } from "../../../utils/dateHelpers";

interface MuscleBarChartProps {}

const MuscleBarChart: React.FC<MuscleBarChartProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const [getMuscleBarChartData, { data: muscleBarChartData }] =
    useGetMuscleBarChartDataLazyQuery();

  const data =
    muscleBarChartData?.getMuscleBarChartData?.muscleBarChartData ?? [];

  // Data for muscle heatmap
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: getDateXMonthsBefore(new Date(), 1, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFinish = () => {
    getMuscleBarChartData({
      variables: {
        input: {
          startTime: moment(heatmapData[0].startDate).format("YYYY-MM-DD"),
          endTime: moment(heatmapData[0].endDate).format("YYYY-MM-DD"),
        },
      },
    });
  };

  useEffect(() => {
    const muscleHeatMapStartDate = moment(
      getDateXMonthsBefore(new Date(), 1, 1),
    ).format("YYYY-MM-DD");

    const muscleHeatMapEndDate = moment().format("YYYY-MM-DD");

    getMuscleBarChartData({
      variables: {
        input: {
          startTime: muscleHeatMapStartDate,
          endTime: muscleHeatMapEndDate,
        },
      },
    });
  }, []);

  if (!data.length) {
    return (
      <Wrapper width="930">
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper width="930">
      <ResponsiveContainer height="99%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fill="#fff" />
          <YAxis
            label={{
              value: "volume in kilograms",
              angle: -90,
              position: "insideLeft",
              fill: "#9b9b9b",
              marginRight: "1em",
            }}
          />
          <Legend />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5em",
              padding: "0.5em 3em",
              backgroundColor: theme.colors.backgroundGray,
              borderColor: theme.colors.grayText,
              fontWeight: "bolder",
            }}
            labelStyle={{
              display: "flex",
              alignSelf: "start",
              order: 1,
              textAlign: "center",
              fontSize: "1.75rem",
            }}
            formatter={(value: number) => {
              return [`${value} kg`, `Volume`];
            }}
          />
          <Bar dataKey={"volume"} fill={getStrokeColor(13)} barSize={26} />
        </BarChart>
      </ResponsiveContainer>
      <CalendarWrapper onClick={() => setShowModal(true)}>
        <Text>
          {moment(heatmapData[0].startDate).format("DD-MM-YYYY")} -{" "}
          {moment(heatmapData[0].endDate).format("DD-MM-YYYY")}
        </Text>
        <CalendarIcon />
      </CalendarWrapper>
      <DateRangePickerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        heatmapData={heatmapData}
        setHeatmapData={setHeatmapData}
        handleFinish={handleFinish}
      />
    </Wrapper>
  );
};
export default MuscleBarChart;
