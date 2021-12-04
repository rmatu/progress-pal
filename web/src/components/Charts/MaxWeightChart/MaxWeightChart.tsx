import React, { useState } from "react";
import {
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
import Loader from "../../UI/Loader/Loader";
import { chartSize } from "../consts";
import { getStrokeColor } from "../strokeColors";
import { LoaderWrapper, Wrapper } from "../styles";
import {} from "./styles";

interface MaxWeightChartProps {
  data: [
    {
      date: string;
      maxWeight: number;
    },
  ];
}

const MaxWeightChart: React.FC<MaxWeightChartProps> = ({ data }) => {
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
        Max Weight
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
            dataKey="maxWeight"
            stroke={theme.colors.orange}
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
              marginLeft: "0.5em",
            }}
            formatter={(value: number) => {
              return [`${value} kg`, `Max weight`];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default MaxWeightChart;
