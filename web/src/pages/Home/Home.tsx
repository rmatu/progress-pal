import { useApolloClient } from "@apollo/client";
import React from "react";
import Loader from "../../components/UI/Loader/Loader";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import {} from "./styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const client = useApolloClient();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <>
      <button
        onClick={async () => {
          await logout();
          await client.resetStore();
        }}
      >
        logout
      </button>
      <p>{data?.me?.username}</p>
      <div>
        <Loader />
      </div>
    </>
  );
};

export default Home;
