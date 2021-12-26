import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme/theme";
import { Heading } from "../../UI";
import { getStrokeColor } from "../strokeColors";
import {
  CalendarWrapper,
  IconsWrapper,
  LoaderWrapper,
  Text,
  Wrapper,
} from "./styles";
import { ReactComponent as PencilIcon } from "../../../assets/svg/pencil.svg";
import { ReactComponent as AddIcon } from "../../../assets/svg/plusCircle.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import DateRangePickerModal from "../../UI/DateRangePickerModal/DateRangePickerModal";
import moment from "moment";
import { getDateXMonthsBefore } from "../../../utils/dateHelpers";
import { useGetWeightChartDataLazyQuery } from "../../../generated/graphql";
import Loader from "../../UI/Loader/Loader";

interface UserWeightChartProps {
  version?: "gradient" | "linear";
}

const UserWeightChart: React.FC<UserWeightChartProps> = ({ version }) => {
  const [showModal, setShowModal] = useState(false);
  const [
    getWeightChartData,
    { data: weightChartData, loading: wieghtChartDataLoading },
  ] = useGetWeightChartDataLazyQuery();

  const chartData = weightChartData?.getWeightChartData ?? [];

  // Data for muscle heatmap
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: getDateXMonthsBefore(new Date(), 1, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFinish = () => {
    getWeightChartData({
      variables: {
        startDate: heatmapData[0].startDate,
        endDate: heatmapData[0].endDate,
      },
    });
  };

  useEffect(() => {
    getWeightChartData({
      variables: {
        startDate: heatmapData[0].startDate,
        endDate: heatmapData[0].endDate,
      },
    });
  }, []);

  if (wieghtChartDataLoading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </Wrapper>
    );
  }

  if (version === "gradient") {
    return (
      <Wrapper>
        <IconsWrapper>
          <PencilIcon />
          <AddIcon />
        </IconsWrapper>
        <Heading size="h3" marginB="0.5em">
          Body weight progress
        </Heading>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={getStrokeColor(6)}
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor={getStrokeColor(6)}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />

            <CartesianGrid
              vertical
              horizontal
              verticalFill={["#444444"]}
              fillOpacity={0.2}
            />
            <YAxis
              label={{
                value: "in kilograms",
                angle: -90,
                position: "insideLeft",
                fill: "#666",
              }}
            />
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
                return [`${value} kg`, `Weight`];
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke={getStrokeColor(6)}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <CalendarWrapper onClick={() => setShowModal(true)}>
          <Text>
            {moment(heatmapData[0].startDate).format("DD MMM YYYY")} -{" "}
            {moment(heatmapData[0].endDate).format("DD MMM YYYY")}
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
  }

  return (
    <Wrapper>
      <Heading size="h3" marginB="0.5em">
        Your weight progress
      </Heading>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <CartesianGrid
            vertical
            horizontal
            verticalFill={["#444444"]}
            fillOpacity={0.2}
          />
          <YAxis
            label={{
              value: "in kilograms",
              angle: -90,
              position: "insideLeft",
              fill: "#666",
            }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={getStrokeColor(6)}
            strokeWidth={3}
          />
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
              return [`${value} kg`, `Weight`];
            }}
          />
        </LineChart>
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
export default UserWeightChart;
