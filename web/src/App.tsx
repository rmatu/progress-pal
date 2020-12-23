import React from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withAuth } from "./services/auth.service";

//Components
import { SignIn, SignUp } from "./containers/Auth";
import Home from "./containers/Home/Home";
import Layout from "./layout/Layout";

const App: React.FC = () => (
  <Layout>
    <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
    <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
    <Route exact path={ROUTES.HOME} component={withAuth(Home)} />
  </Layout>
);

export default App;
