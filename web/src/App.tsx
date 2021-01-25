import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withAuth } from "./services/auth.service";
import { AnimatePresence } from "framer-motion";

//Components
import { SignIn, SignUp, VerifyEmail } from "./containers/Auth";
import Home from "./containers/Home/Home";
import LandingPage from "./containers/LandingPage/LandingPage";
import Account from "./containers/Account/Account";

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
      key={ROUTES.VERIFY_EMAIL}
      exact
      path={ROUTES.VERIFY_EMAIL}
      component={VerifyEmail}
    />
    <Route
      key={ROUTES.HOME}
      exact
      path={ROUTES.HOME}
      component={withAuth(Home)}
    />
    <Route
      key={ROUTES.ACCOUNT}
      exact
      path={ROUTES.ACCOUNT}
      component={withAuth(Account)}
    />
    <Redirect to={ROUTES.LANDING_PAGE} />
  </AnimatePresence>
);

export default App;
