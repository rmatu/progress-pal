import React from "react";
import {} from "./styles";
import { useMeQuery, useSignInMutation } from "../../../generated/graphql";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { data, refetch } = useMeQuery();
  const [login] = useSignInMutation();

  return (
    <>
      <p>{data?.me?.username}</p>
      <button
        onClick={async () => {
          await login({
            variables: {
              usernameOrEmail: "bob",
              password: "bob",
            },
          });
          await refetch();
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
