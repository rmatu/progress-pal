import React from "react";
import { onboardingSteps } from "../../constants/onboarding";
import { useMeQuery } from "../../generated/graphql";
import Dashboard from "./Dashboard/Dashboard";
import Onboarding from "./Onboarding/Onboarding";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data: userData, refetch: refetchUseMeQuery } = useMeQuery();

  return userData?.me?.onboardingStep! < onboardingSteps.ONBOARDING_FINISHED ? (
    <Onboarding refetchUseMeQuery={refetchUseMeQuery} />
  ) : (
    <Dashboard user={userData?.me} />
  );
};

export default Home;
