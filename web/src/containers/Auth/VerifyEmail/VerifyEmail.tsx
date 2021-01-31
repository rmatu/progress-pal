import React from "react";
import {
  Wrapper,
  LogoContainer,
  EmailIconWrapper,
  StyledP,
  Content,
  GoBack,
  Username,
  ExpirationText,
} from "./styles";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as EmailIcon } from "../../../assets/svg/email.svg";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as Circle } from "../../../assets/svg/circle.svg";
import {
  useMeQuery,
  useSendVerifyEmailMutation,
} from "../../../generated/graphql";
import { Button, Heading } from "../../../components/UI";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import Footer from "../../../components/Footer/Footer";

interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = ({}) => {
  const { data } = useMeQuery();
  const [sendEmail, { loading }] = useSendVerifyEmailMutation();

  const handleOnClick = async () => {
    const email = data?.me?.email;

    if (!email) {
      return;
    }

    await sendEmail({ variables: { email } });
  };

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
        <Circle id="circle" />
        <Content>
          <Heading size="h1" marginB="0" color="white">
            Welcome
          </Heading>
          <Username> {data?.me?.username}!</Username>
          <EmailIconWrapper>
            <EmailIcon />
          </EmailIconWrapper>
          <StyledP>
            Your account has been successfully registered. To complete the
            process please check your email for a validation request.
          </StyledP>
          <Button
            loading={loading ? "Sending email... " : null}
            onClick={() => handleOnClick()}
          >
            Resend email
          </Button>
          <ExpirationText>
            Verification link will expire in <span>10 min</span>
          </ExpirationText>
        </Content>
        <Footer />
      </Wrapper>
    </>
  );
};
export default VerifyEmail;
