import React from "react";
import Header from "../../components/Navigation/Header/Header";
import { HeaderWrapper, RestContent, StatusCode, Text } from "./styles";

interface PageNotFoundProps {}

const PageNotFound: React.FC<PageNotFoundProps> = () => (
  <>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <RestContent>
      <StatusCode>404</StatusCode>
      <Text>Page Not Found</Text>
    </RestContent>
  </>
);

export default PageNotFound;
