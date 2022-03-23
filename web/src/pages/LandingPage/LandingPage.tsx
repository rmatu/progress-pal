import React from "react";
import Header from "../../components/Navigation/Header/Header";
import { Heading } from "../../components/UI";
import { HeaderWrapper, RestContent } from "./styles";
interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <RestContent>
        <Heading marginB="0" color="#FFF" size="h3">
          Confirm your email
        </Heading>
      </RestContent>
    </>
  );
};
export default LandingPage;
