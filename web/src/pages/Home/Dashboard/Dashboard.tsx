import React from "react";
import DashboardNavbar from "../../../components/Navigation/DashboardNavbar/DashboardNavbar";
import { MeQuery } from "../../../generated/graphql";
import { RightContent, Wrapper } from "./styles";

interface DashboardProps {
  user: MeQuery["me"] | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <Wrapper>
      <DashboardNavbar user={user} />
      <RightContent></RightContent>
    </Wrapper>
  );
};

export default Dashboard;
