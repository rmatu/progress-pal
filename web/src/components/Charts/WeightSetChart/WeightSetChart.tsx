import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  convertToWeightSetChartData,
  getHighestAmountOfSets,
} from "../../../utils/converters";
import { Heading } from "../../UI";
import Loader from "../../UI/Loader/Loader";
import { getStrokeColor } from "./strokeColors";
import { Wrapper } from "./styles";

interface WeightSetChartProps {
  data: [
    {
      date: string;
      sets: number[];
    },
  ];
}

const WeightSetChart: React.FC<WeightSetChartProps> = ({ data }) => {
  const [convertedDataForGraph, setConvertedDataForGraph] =
    useState<{ [key: string]: any }[]>();
  const [size, setSize] = useState({
    width: 500,
    height: 300,
  });

  useEffect(() => {
    if (!data) return;
    setConvertedDataForGraph(convertToWeightSetChartData(data));
  }, [data]);

  if (!data || !convertedDataForGraph?.length) {
    return (
      <Wrapper width={size.width}>
        <Loader />
      </Wrapper>
    );
  }

  const createLines = () => {
    const setAmount = getHighestAmountOfSets(convertedDataForGraph);
    const lines = [];
    for (let i = 0; i < setAmount; i++) {
      lines.push(
        <Line
          key={`set${i + 1}`}
          type="monotone"
          dataKey={`set${i + 1}`}
          stroke={getStrokeColor(i + 1)}
          strokeWidth={3}
        />,
      );
    }
    return lines;
  };

  return (
    <Wrapper width={size.width}>
      <Heading size="h3" marginB="0.5em">
        Weight with Set
      </Heading>
      <LineChart
        width={size.width}
        height={size.height}
        data={convertedDataForGraph}
      >
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
        {createLines()}
        <Tooltip />
      </LineChart>
    </Wrapper>
  );
};
export default WeightSetChart;
