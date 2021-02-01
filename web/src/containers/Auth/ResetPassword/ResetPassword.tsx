import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as EyeIcon } from "../../../assets/svg/eye.svg";
import {
  LogoContainer,
  Wrapper,
  GoBack,
  Content,
  StyledP,
  ExpirationText,
  StyledForm,
  FieldWrapper,
} from "./styles";
import * as ROUTES from "../../../constants/routes";
import { Button, Heading } from "../../../components/UI";
import Footer from "../../../components/Footer/Footer";
import { Field, Formik } from "formik";
import Input from "../../../components/UI/Input/Input";
import {
  ResetPasswordSchema,
  ResetPasswordTypes,
  ResetPasswordValues,
} from "../../../utils/formSchemas";
import { useChangePasswordMutation } from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const { token }: any = useParams();
  const router = useRouter();

  return (
    <Wrapper>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
      <Content>
        <Heading size="h1" marginB="0" color="white">
          Password Reset
        </Heading>

        <StyledP>
          Please note that when changing your password, we ask you to set
          yourself a secure password. This is for your own safety.
        </StyledP>
        <Formik
          isInitialValid={false}
          initialValues={ResetPasswordValues}
          validationSchema={ResetPasswordSchema}
          onSubmit={async (
            { password }: ResetPasswordTypes,
            { setSubmitting }
          ) => {
            await changePassword({
              variables: {
                password,
                token,
              },
            });
            await setSubmitting(false);
            await router.push("/sign-in");
          }}
        >
          {({ isSubmitting, isValid }) => (
            <StyledForm>
              <FieldWrapper active={passwordVisibility}>
                <Field
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  component={Input}
                >
                  <EyeIcon
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                  />
                </Field>
              </FieldWrapper>

              <Field
                type={passwordVisibility ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                component={Input}
              ></Field>

              <Button
                loading={isSubmitting ? "Sending..." : null}
                marginTop="3em"
                color="main"
                disabled={!isValid}
                type="submit"
              >
                Send
              </Button>
            </StyledForm>
          )}
        </Formik>
        <ExpirationText>
          The request is valid for <span>10 min</span>
        </ExpirationText>
      </Content>
      <Footer />
    </Wrapper>
  );
};
export default ResetPassword;
