import React, { useState } from "react";
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
import { chartSize } from "../consts";
import { getStrokeColor } from "../strokeColors";
import { LoaderWrapper } from "../styles";
import { CalendarWrapper, Text, Wrapper } from "./styles";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import { subDays } from "date-fns";
import moment from "moment";
import DateRangePickerModal from "../../UI/DateRangePickerModal/DateRangePickerModal";

interface MuscleBarChartProps {}

const mockData = [
  { volume: 12, name: "Shoulder" },
  { volume: 30, name: "Glutes" },
  { volume: 30, name: "Adduct" },
  { volume: 10, name: "Biceps" },
  { volume: 12, name: "Calves" },
  { volume: 30, name: "Chest" },
  { volume: 30, name: "Forearm" },
  { volume: 30, name: "Abs" },
  { volume: 10, name: "Hamstring" },
  { volume: 12, name: "Lats" },
  { volume: 30, name: "Traps" },
  { volume: 30, name: "Mid Back" },
  { volume: 10, name: "Quads" },
  { volume: 30, name: "Triceps" },
  { volume: 30, name: "Neck" },
  { volume: 30, name: "Low Back" },
];

const MuscleBarChart: React.FC<MuscleBarChartProps> = () => {
  const [size, setSize] = useState({ ...chartSize.DESKTOP });
  const [showModal, setShowModal] = useState(false);

  // Data for muscle heatmap
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: subDays(new Date(), 14),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFinish = () => {};

  if (!mockData) {
    return (
      <LoaderWrapper width={size.WIDTH} height={size.HEIGHT}>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper width="930">
      <ResponsiveContainer height="99%">
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fill="#fff" />
          <YAxis
            label={{
              value: "volume in kilograms",
              angle: -90,
              position: "insideLeft",
              fill: "#9b9b9b",
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
