import { useApolloClient } from "@apollo/client";
import React from "react";
import { onboardingSteps } from "../../constants/onboarding";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import Dashboard from "./Dashboard/Dashboard";
import Onboarding from "./Onboarding/Onboarding";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const client = useApolloClient();
  const { data: userData, refetch: refetchUseMeQuery } = useMeQuery();
  const [logout] = useLogoutMutation();

  return userData?.me?.onboardingStep! < onboardingSteps.ONBOARDING_FINISHED ? (
    <Onboarding refetchUseMeQuery={refetchUseMeQuery} />
  ) : (
    <Dashboard />
  );
};

export default Home;
