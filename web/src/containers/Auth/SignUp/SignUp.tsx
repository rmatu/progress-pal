import { Field, Formik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as EyeIcon } from "../../../assets/svg/eye.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/google-plus.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { Button, Heading } from "../../../components/UI";
import { StyledForm } from "../../../components/UI/FormElements";
import Input from "../../../components/UI/Input/Input";
import Separator from "../../../components/UI/Separator/Separator";
import * as ROUTES from "../../../constants/routes";
import {
  SignUpFormTypes,
  SignUpInitialValues,
  SignUpSchema,
} from "../../../utils/formSchemas";
import {
  AuthText,
  AuthWrapper,
  AuthContent,
  FieldRow,
  FieldWrapper,
  GoBack,
  RegistrationForm,
  SignInChangeWrapper,
  SignInChangeContent,
  SocialIcons,
  StyledP,
  LogoContainer,
  Wrapper,
} from "./styles";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

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
      <SignInChangeWrapper>
        <SignInChangeContent
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <Heading size="h1" color="white" marginB="0.5em">
            One Of Us?
          </Heading>
          <StyledP>
            If you already have an account, just sign in. We've missed you!
          </StyledP>
          <NavLink to={ROUTES.SIGN_IN}>
            <Button>Sign In</Button>
          </NavLink>
        </SignInChangeContent>
      </SignInChangeWrapper>
      <AuthWrapper>
        <AuthContent>
          <Heading size="h1" color="white" marginB="0.2em">
            Create Free Account
          </Heading>
          <AuthText>Sign up using social networks</AuthText>
          <SocialIcons>
            <FacebookIcon />
            <GoogleIcon />
          </SocialIcons>
          <RegistrationForm>
            <Separator />
            <Formik
              isInitialValid={false}
              initialValues={SignUpInitialValues}
              validationSchema={SignUpSchema}
              onSubmit={async (values: SignUpFormTypes, { setSubmitting }) => {
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <StyledForm>
                  <FieldRow>
                    <FieldWrapper>
                      <Field
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        component={Input}
                      ></Field>
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        component={Input}
                      ></Field>
                    </FieldWrapper>
                  </FieldRow>
                  <FieldRow>
                    <FieldWrapper>
                      <Field
                        type={passwordVisibility ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        component={Input}
                      >
                        <EyeIcon
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
                        />
                      </Field>
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        type={passwordVisibility ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        component={Input}
                      >
                        <EyeIcon
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
                        />
                      </Field>
                    </FieldWrapper>
                  </FieldRow>
                  <Button
                    marginTop="1em"
                    color="main"
                    disabled={!isValid}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </StyledForm>
              )}
            </Formik>
          </RegistrationForm>
        </AuthContent>
      </AuthWrapper>
    </Wrapper>
  );
};
export default SignUp;
