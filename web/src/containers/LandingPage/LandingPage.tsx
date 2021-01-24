import React from "react";
import Header from "../../components/Navigation/Header/Header";
import { HeaderWrapper } from "./styles";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
  );
};
export default LandingPage;
