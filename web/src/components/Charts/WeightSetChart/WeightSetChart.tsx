import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { mockData } from "../../../pages/Exercise/mockdata";
import Loader from "../../UI/Loader/Loader";
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
  if (!data) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  console.log(data);

  // {
  //   name: "29/11/2021",
  //   uv: 3000,
  //   pv: 1398,
  //   amt: 2210,
  // },

  return (
    <AreaChart
      width={730}
      height={250}
      data={mockData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};
export default WeightSetChart;
