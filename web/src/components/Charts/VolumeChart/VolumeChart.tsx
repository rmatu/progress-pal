import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme/theme";
import { Heading } from "../../UI";
import Loader from "../../UI/Loader/Loader";
import { chartSize } from "../consts";
import { getStrokeColor } from "../strokeColors";
import { LoaderWrapper, Wrapper } from "../styles";
import {} from "./styles";

interface VolumeChartProps {
  data: [
    {
      date: string;
      volume: number;
    },
  ];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const [size, setSize] = useState({ ...chartSize.DESKTOP });

  if (!data) {
    return (
      <LoaderWrapper width={size.WIDTH} height={size.HEIGHT}>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper width={size.WIDTH}>
      <Heading size="h3" marginB="0.5em">
        Volume
      </Heading>
      <ResponsiveContainer width="100%" height={size.HEIGHT}>
        <LineChart width={size.WIDTH} height={size.HEIGHT} data={data}>
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
            dataKey="volume"
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
              display: "none",
            }}
            formatter={(value: number) => {
              return [`${value} kg`, `Volume`];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default VolumeChart;
