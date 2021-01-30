import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Navigation/Header/Header";
import { Heading } from "../../components/UI";
import { HeaderWrapper, RestContent } from "./styles";
interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <RestContent>
        <Heading marginB="0" color="#FFF" size="h3">
          Here will be all the info about ProgressPal
        </Heading>
        <NavLink to={"/email-confirm"}>
          <button>Confirm Email</button>
        </NavLink>
      </RestContent>
    </>
  );
};
export default LandingPage;
