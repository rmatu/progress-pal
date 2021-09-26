import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavbar from "../../../components/Navigation/DashboardNavbar/DashboardNavbar";
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
      <RightContent></RightContent>
    </Wrapper>
  );
};

export default Dashboard;
