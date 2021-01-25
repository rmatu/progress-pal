import React from "react";
import {
  Wrapper,
  LogoContainer,
  EmailIconWrapper,
  StyledP,
  Content,
  GoBack,
} from "./styles";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as EmailIcon } from "../../../assets/svg/email.svg";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { useMeQuery } from "../../../generated/graphql";
import { Button, Heading } from "../../../components/UI";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = ({}) => {
  const { data } = useMeQuery();

  return (
    <>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
      <Wrapper>
        <Content>
          <Heading size="h1" marginB="0.5em" color="white">
            Welcome {data?.me?.username}!
          </Heading>
          <EmailIconWrapper>
            <EmailIcon />
          </EmailIconWrapper>
          <StyledP>
            Your account has been successfully registered. To complete the
            process please check your email for a validation request
          </StyledP>
          <Button>Resend email</Button>
        </Content>
      </Wrapper>
    </>
  );
};
export default VerifyEmail;
