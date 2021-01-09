import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wrapper,
  SignInChange,
  GoBack,
  StyledP,
  AuthWrapper,
  AuthText,
  SocialIcons,
  RegistrationForm,
} from "./styles";
import { Button, Heading } from "../../../components/UI";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/google-plus.svg";

import * as ROUTES from "../../../constants/routes";
import Separator from "../../../components/UI/Separator/Separator";
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
        <Heading size="h1" color="white" marginB="0.5em">
          One Of Us?
        </Heading>
        <StyledP>
          If you already have an account, just sign in. We've missed you!
        </StyledP>
        <NavLink to={ROUTES.SIGN_IN}>
          <Button>Sign In</Button>
        </NavLink>
      </SignInChange>
      <AuthWrapper>
        <Heading size="h1" color="white" marginB="0.2em">
          Create Free Account
        </Heading>
        <AuthText>Sign up using</AuthText>
        <SocialIcons>
          <FacebookIcon />
          <GoogleIcon />
        </SocialIcons>
        <RegistrationForm>
          <Separator />
        </RegistrationForm>
      </AuthWrapper>
    </Wrapper>
  );
};
export default SignUp;
