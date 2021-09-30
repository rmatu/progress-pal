import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YearlyCalendarHeatmap from "../../../components/UI/YearlyCalendarHeatmap/YearlyCalendarHeatmap";
import { MeQuery } from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { AppState } from "../../../redux/rootReducer";
import { setDashboardItem } from "../../../utils/setDashboardItem";

import { RightContent } from "./styles";

const values = [
  { date: "2021-01-02", amount: 12 },
  { date: "2021-01-22", amount: 122 },
  { date: "2021-12-15", amount: 38 },
];

interface DashboardProps {
  user: MeQuery["me"] | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [startDate, setStartDate] = useState(
    moment("2021-01-01").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    moment("2021-12-31").format("YYYY-MM-DD"),
  );
  const width = useWindowResize();
  const { selectedItem, open } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );

  console.log({ startDate, endDate });

  const dispatch = useDispatch();

  useEffect(() => {
    setDashboardItem(selectedItem, "dashboard", dispatch);
  }, [dispatch, selectedItem]);

  useEffect(() => {
    if (width < 600) {
      setStartDate(moment(startDate).set("month", 6).format("YYYY-MM-DD"));
    } else {
      setStartDate(moment(startDate).set("month", 0).format("YYYY-MM-DD"));
    }
  }, [width]);

  return (
    <DashbordLayoutHOC user={user}>
      <RightContent open={open}>
        <YearlyCalendarHeatmap
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          values={values}
        />
      </RightContent>
    </DashbordLayoutHOC>
  );
};

export default Dashboard;
