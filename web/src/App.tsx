import React from "react";
import { Provider } from "urql";
import { useMeQuery } from "./generated/graphql";
import { client } from "./utils/createUrqlClient";
import { Login } from "./containers/Auth/Login/Login";

const App = () => {
  let routes;

  return (
    <Provider value={client}>
      <Login />
    </Provider>
  );
};

export default App;
