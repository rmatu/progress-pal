import React from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withAuth } from "./services/auth.service";
import { AnimatePresence } from "framer-motion";

//Components
import { SignIn, SignUp } from "./containers/Auth";
import Home from "./containers/Home/Home";
import Layout from "./layout/Layout";
import LandingPage from "./containers/LandingPage/LandingPage";

const App: React.FC = () => (
  <AnimatePresence>
    <Layout>
      <Route exact path={ROUTES.LANDING_PAGE} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.HOME} component={withAuth(Home)} />
    </Layout>
  </AnimatePresence>
);

export default App;
