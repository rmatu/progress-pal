import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavbar from "../../../components/Navigation/DashboardNavbar/DashboardNavbar";
import YearlyCalendarHeatmap from "../../../components/UI/YearlyCalendarHeatmap/YearlyCalendarHeatmap";
import { MeQuery } from "../../../generated/graphql";
import { AppState } from "../../../redux/rootReducer";
import { setDashboardItem } from "../../../utils/setDashboardItem";
import { RightContent, Wrapper } from "./styles";

interface DashboardProps {
  user: MeQuery["me"] | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { selectedItem } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setDashboardItem(selectedItem, "dashboard", dispatch);
  }, [dispatch, selectedItem]);

  return (
    <Wrapper>
      <DashboardNavbar user={user} />
      <RightContent>
        <YearlyCalendarHeatmap
          startDate="2021-01-01"
          endDate="2021-12-31"
          values={[
            { date: "2021-01-02", amount: 12 },
            { date: "2021-01-22", amount: 122 },
            { date: "2021-01-30", amount: 38 },
          ]}
        />
      </RightContent>
    </Wrapper>
  );
};

export default Dashboard;
