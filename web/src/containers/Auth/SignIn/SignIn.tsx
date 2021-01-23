import { Field, Formik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as EyeIcon } from "../../../assets/svg/eye.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/google-plus.svg";
import { Button, Heading } from "../../../components/UI";
import { StyledForm } from "../../../components/UI/FormElements";
import Input from "../../../components/UI/Input/Input";
import Separator from "../../../components/UI/Separator/Separator";
import * as ROUTES from "../../../constants/routes";
import {
  SignInFormTypes,
  SignInInitialValues,
  SignInSchema,
} from "../../../utils/formSchemas";
import {
  AuthText,
  AuthWrapper,
  FieldRow,
  FieldWrapper,
  GoBack,
  LoginForm,
  SignInChange,
  SocialIcons,
  StyledP,
  Wrapper,
} from "./styles";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = ({}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  return (
    <Wrapper>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
      <AuthWrapper>
        <Heading size="h1" color="white" marginB="0.2em">
          Login to Your Account
        </Heading>
        <AuthText>Login using social networks</AuthText>
        <SocialIcons>
          <FacebookIcon />
          <GoogleIcon />
        </SocialIcons>
        <LoginForm>
          <Separator />
          <Formik
            isInitialValid={false}
            initialValues={SignInInitialValues}
            validationSchema={SignInSchema}
            onSubmit={async (values: SignInFormTypes, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <StyledForm>
                <FieldRow>
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
                </FieldRow>
                <Button
                  marginTop="1em"
                  color="main"
                  disabled={!isValid}
                  type="submit"
                >
                  Sign In
                </Button>
              </StyledForm>
            )}
          </Formik>
        </LoginForm>
      </AuthWrapper>
      <SignInChange>
        <Heading size="h1" color="white" marginB="0.5em">
          New Here?
        </Heading>
        <StyledP>
          Sign up and discovver a great amount of new opportunities!
        </StyledP>
        <NavLink to={ROUTES.SIGN_UP}>
          <Button>Sign Up</Button>
        </NavLink>
      </SignInChange>
    </Wrapper>
  );
};
export default SignIn;
