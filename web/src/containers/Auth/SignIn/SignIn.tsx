import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
interface SignInProps {}

const SignIn: React.FC<SignInProps> = ({}) => {
  return (
    <div>
      <p>Sign In Component!</p>
      <NavLink to={ROUTES.SIGN_UP}>
        <p>Go to sign up</p>
      </NavLink>
    </div>
  );
};
export default SignIn;
