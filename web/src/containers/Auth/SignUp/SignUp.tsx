import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper, SignInChange, GoBack, StyledH1, StyledP } from "./styles";
import { Button } from "../../../components/UI";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import * as ROUTES from "../../../constants/routes";
interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  return (
    <Wrapper>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
      <SignInChange>
        <StyledH1>One Of Us?</StyledH1>
        <StyledP>
          If you already have an account, just sign in. We've missed you!{" "}
        </StyledP>
        <NavLink to={ROUTES.SIGN_IN}>
          <Button>Sign In</Button>
        </NavLink>
      </SignInChange>
    </Wrapper>
  );
};
export default SignUp;
