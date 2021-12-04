import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme/theme";
import {
  convertToWeightSetChartData,
  getHighestAmountOfSets,
} from "../../../utils/converters";
import { Heading } from "../../UI";
import Loader from "../../UI/Loader/Loader";
import { chartSize } from "../consts";
import { getStrokeColor } from "../strokeColors";
import { LoaderWrapper, Wrapper } from "../styles";

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
  const [size, setSize] = useState({ ...chartSize.DESKTOP });

  useEffect(() => {
    if (!data) return;
    setConvertedDataForGraph(convertToWeightSetChartData(data));
  }, [data]);

  if (!data || !convertedDataForGraph?.length) {
    return (
      <LoaderWrapper width={size.WIDTH} height={size.HEIGHT}>
        <Loader />
      </LoaderWrapper>
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
          connectNulls
        />,
      );
    }

    return lines;
  };

  return (
    <Wrapper width={size.WIDTH}>
      <Heading size="h3" marginB="0.5em">
        Weight with Set
      </Heading>
      <ResponsiveContainer width="100%" height={size.HEIGHT}>
        <LineChart
          width={size.WIDTH}
          height={size.HEIGHT}
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
          <Tooltip
            contentStyle={{
              borderRadius: "0.5em",
              padding: "0.5em 3em",
              backgroundColor: theme.colors.backgroundGray,
              borderColor: theme.colors.grayText,
              fontWeight: "bolder",
              display: "flex",
              flexDirection: "column-reverse",
            }}
            // Don't know how to fix those
            //@ts-ignore
            itemSorter={({ name }) => {
              if (!name) return;
              //@ts-ignore
              const setNumber = Number(name.slice(3, name.length));
              return -setNumber;
            }}
            labelStyle={{
              display: "none",
            }}
            formatter={(value: number, name: string) => {
              const setNumber = name.slice(3, name.length);
              return [`${value} kg`, `Set ${setNumber}`];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default WeightSetChart;
