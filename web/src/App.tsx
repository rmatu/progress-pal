import { AnimatePresence } from "framer-motion";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { useMeQuery } from "./generated/graphql";

//Components
import Account from "./containers/Account/Account";
import Login from "./containers/Auth/Login/Login";
import Home from "./containers/Home/Home";
import Layout from "./layout/Layout";

const App = () => {
  let routes;
  const { data } = useMeQuery();

  // If there is no cookie set in the browser, user is not logged
  if (!data?.me) {
    routes = (
      <AnimatePresence>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Redirect to={ROUTES.LOGIN} />
        </Switch>
      </AnimatePresence>
    );
  } else {
    routes = (
      <AnimatePresence>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      </AnimatePresence>
    );
  }

  return <Layout>{routes}</Layout>;
};

export default App;
