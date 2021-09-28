import React from "react";
import DashboardNavbar from "../components/Navigation/DashboardNavbar/DashboardNavbar";
import Header from "../components/Navigation/Header/Header";
import { MeQuery } from "../generated/graphql";

import { HeaderWrapper, Wrapper } from "./styles";

interface DashbordLayoutHOCProps {
  user: MeQuery["me"] | undefined;
}

const DashbordLayoutHOC: React.FC<DashbordLayoutHOCProps> = ({
  children,
  user,
}) => {
  return (
    <>
      <HeaderWrapper>
        <Header dashboardHeader />
      </HeaderWrapper>
      <Wrapper>
        <DashboardNavbar user={user} />
        {children}
      </Wrapper>
    </>
  );
};
export default DashbordLayoutHOC;
