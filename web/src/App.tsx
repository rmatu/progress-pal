import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withAuth } from "./services/auth.service";
import { AnimatePresence } from "framer-motion";
import { withEmail } from "./services/email.service";

//Components
import {
  SignIn,
  SignUp,
  VerifyEmail,
  ConfirmEmail,
  ResetPassword,
} from "./pages/Auth";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Account from "./pages/Account/Account";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import Privacy from "./pages/Privacy/Privacy";

const App: React.FC = () => (
  <AnimatePresence>
    <Switch>
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
        key={ROUTES.RESET_PASSWORD}
        exact
        path={ROUTES.RESET_PASSWORD}
        component={ResetPassword}
      />
      <Route
        key={ROUTES.TERMS_OF_SERVICE}
        exact
        path={ROUTES.TERMS_OF_SERVICE}
        component={TermsOfService}
      />
      <Route
        key={ROUTES.PRIVACY_POLICY}
        exact
        path={ROUTES.PRIVACY_POLICY}
        component={Privacy}
      />
      <Route
        key={ROUTES.EMAIL_CONFIRM}
        exact
        path={ROUTES.EMAIL_CONFIRM}
        component={withEmail(ConfirmEmail)}
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
      <Redirect to={ROUTES.HOME} />
    </Switch>
  </AnimatePresence>
);

export default App;
