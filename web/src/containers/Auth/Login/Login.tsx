import React from "react";
import {} from "./styles";
import { useMeQuery, useLoginMutation } from "../../../generated/graphql";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { data, refetch } = useMeQuery();
  const [login] = useLoginMutation();

  return (
    <div className="navbar">
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
    </div>
  );
};

export default Login;
