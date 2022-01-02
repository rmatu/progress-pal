import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { AnimatePresence } from "framer-motion";
import { withAuth } from "./services/auth.service";
import { withEmail } from "./services/email.service";
import { withRedirectLoggedInUser } from "./services/loggedInUser.service";

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
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AddWorkout from "./pages/AddWorkout/AddWorkout";
import Workouts from "./pages/Workouts/Workouts";
import Workout from "./pages/Workouts/Workout/Workout";
import Exercise from "./pages/Exercises/Exercise/Exercise";
import Exercises from "./pages/Exercises/Exercises";
import AddExercise from "./pages/AddExercise/AddExercise";

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
        component={withRedirectLoggedInUser(SignIn)}
      />
      <Route
        key={ROUTES.SIGN_UP}
        exact
        path={ROUTES.SIGN_UP}
        component={withRedirectLoggedInUser(SignUp)}
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
        key={ROUTES.PAGE_NOT_FOUND}
        exact
        path={ROUTES.PAGE_NOT_FOUND}
        component={PageNotFound}
      />
      <Route
        key={ROUTES.EMAIL_CONFIRM}
        exact
        path={ROUTES.EMAIL_CONFIRM}
        component={withEmail(ConfirmEmail)}
      />
      <Route
        key={ROUTES.MAIN_PAGE}
        exact
        path={ROUTES.MAIN_PAGE}
        component={withAuth(Home)}
      />
      <Route
        key={ROUTES.ACCOUNT}
        exact
        path={ROUTES.ACCOUNT}
        component={withAuth(Account)}
      />
      <Route
        key={ROUTES.ADD_WORKOUT}
        exact
        path={ROUTES.ADD_WORKOUT}
        component={withAuth(AddWorkout)}
      />
      <Route
        key={ROUTES.ADD_EXERCISE}
        exact
        path={ROUTES.ADD_EXERCISE}
        component={withAuth(AddExercise)}
      />
      <Route
        key={ROUTES.WORKOUTS}
        exact
        path={ROUTES.WORKOUTS}
        component={withAuth(Workouts)}
      />
      <Route
        key={`${ROUTES.EXERCISE}`}
        exact
        path={`${ROUTES.EXERCISE}`}
        component={withAuth(Exercises)}
      />
      <Route
        key={`${ROUTES.EXERCISE}/:id`}
        exact
        path={`${ROUTES.EXERCISE}/:id`}
        component={withAuth(Exercise)}
      />
      <Route
        key={`${ROUTES.WORKOUTS}/:id`}
        exact
        path={`${ROUTES.WORKOUTS}/:id`}
        component={withAuth(Workout)}
      />
      <Redirect to={ROUTES.PAGE_NOT_FOUND} />
    </Switch>
  </AnimatePresence>
);

export default App;
