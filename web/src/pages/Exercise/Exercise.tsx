import React from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { data } from "./mockdata";
import {} from "./styles";

interface ExerciseProps {}

const Exercise: React.FC<ExerciseProps> = ({}) => {
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const { data: userData } = useMeQuery();

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
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
      </RightContent>
    </DashbordLayoutHOC>
  );
};
export default Exercise;
