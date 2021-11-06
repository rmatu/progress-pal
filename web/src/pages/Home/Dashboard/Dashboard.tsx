import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YearlyCalendarHeatmap from "../../../components/UI/YearlyCalendarHeatmap/YearlyCalendarHeatmap";
import {
  MeQuery,
  useGetUserYearlyWorkoutDataLazyQuery,
} from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../../hoc/styles";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { AppState } from "../../../redux/rootReducer";
import { setDashboardItem } from "../../../utils/setDashboardItem";

interface DashboardProps {
  user: MeQuery["me"] | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [
    getAllUserYearlyWorkoutData,
    { data: calendarData, loading: loadingCalendarData },
  ] = useGetUserYearlyWorkoutDataLazyQuery();

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

  const dispatch = useDispatch();

  useEffect(() => {
    setDashboardItem(selectedItem, "dashboard", dispatch);
  }, []);

  // Data for this page
  useEffect(() => {
    getAllUserYearlyWorkoutData({
      variables: {
        startDate: moment().set({ month: 0, date: 1 }).format("YYYY-MM-DD"),
        endDate: moment().set({ month: 11, date: 31 }).format("YYYY-MM-DD"),
      },
    });
  }, []);

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
          endDate={endDate}
          loadingCalendarData={loadingCalendarData}
          getAllUserYearlyWorkoutData={getAllUserYearlyWorkoutData}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          values={calendarData?.getUserYearlyWorkoutData}
        />
      </RightContent>
    </DashbordLayoutHOC>
  );
};

export default Dashboard;
