import { useApolloClient } from "@apollo/client";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import Onboarding from "./Onboarding/Onboarding";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const client = useApolloClient();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  console.log(data);

  return <Onboarding />;
};

export default Home;
