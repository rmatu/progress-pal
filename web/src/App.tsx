import React from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from "./generated/graphql";

const App = () => {
  const [{ data }, me] = useMeQuery();
  const [{ data: loginData }, login] = useLoginMutation();
  const [, logout] = useLogoutMutation();

  return (
    <>
      <button
        onClick={async () => {
          await me();
          console.log("data", data);
        }}
      >
        Me
      </button>
      <button
        onClick={async () => {
          await logout();
        }}
      >
        logout
      </button>
      <button
        onClick={async () =>
          await login({ usernameOrEmail: "bob", password: "bob" })
        }
      >
        login
      </button>
      <p>username: {loginData?.login.user?.username}</p>
    </>
  );
};

export default App;
