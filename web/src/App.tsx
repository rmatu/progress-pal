import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withAuth } from "./services/auth.service";
import { AnimatePresence } from "framer-motion";

//Components
import { SignIn, SignUp } from "./containers/Auth";
import Home from "./containers/Home/Home";
import LandingPage from "./containers/LandingPage/LandingPage";

const App: React.FC = () => (
  <AnimatePresence>
    <Route
      key={ROUTES.LANDING_PAGE}
      exact
      path={ROUTES.LANDING_PAGE}
      component={LandingPage}
    />
    <Route
      key={ROUTES.SIGN_IN}
      exact
      path={ROUTES.SIGN_IN}
      component={SignIn}
    />
    <Route
      key={ROUTES.SIGN_UP}
      exact
      path={ROUTES.SIGN_UP}
      component={SignUp}
    />
    <Route
      key={ROUTES.HOME}
      exact
      path={ROUTES.HOME}
      component={withAuth(Home)}
    />
    <Redirect to={ROUTES.LANDING_PAGE} />
  </AnimatePresence>
);

export default App;
