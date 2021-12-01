import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Heading } from "../../UI";
import Loader from "../../UI/Loader/Loader";
import { getStrokeColor } from "../strokeColors";
import { Wrapper } from "../styles";
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
  const [size, setSize] = useState({
    width: 500,
    height: 300,
  });

  if (!data) {
    return (
      <Wrapper width={size.width}>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper width={size.width}>
      <Heading size="h3" marginB="0.5em">
        Volume
      </Heading>
      <LineChart width={size.width} height={size.height} data={data}>
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

        <Tooltip />
      </LineChart>
    </Wrapper>
  );
};
export default VolumeChart;
