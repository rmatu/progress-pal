import React from "react";
import { GetWieghtChartDataResponse } from "../../../../../generated/graphql";
import {} from "./styles";

interface WeightRowProps {
  data: GetWieghtChartDataResponse;
}

const WeightRow: React.FC<WeightRowProps> = ({ data }) => {
  return (
    <>
      <p>{data.date}</p>
      <p>{data.date}</p>
      <p>{data.date}</p>
    </>
  );
};
export default WeightRow;
