import { Field, Formik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as EyeIcon } from "../../../assets/svg/eye.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/google-plus.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as Wave } from "../../../assets/svg/signInWave.svg";
import Footer from "../../../components/Footer/Footer";
import { Button, Heading, Modal } from "../../../components/UI";
import { StyledForm } from "../../../components/UI/FormElements";
import Input from "../../../components/UI/Input/Input";
import Separator from "../../../components/UI/Separator/Separator";
import * as ROUTES from "../../../constants/routes";
import { useMeQuery, useSignInMutation } from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";
import {
  ForgetEmailInitialValues,
  ForgetEmailSchema,
  ForgetEmailTypes,
  SignInFormTypes,
  SignInInitialValues,
  SignInSchema,
} from "../../../utils/formSchemas";
import { toErrorMap } from "../../../utils/toErrorMap";
import ForgotEmailModal from "./ForgotEmailModal/ForgotEmailModal";
import {
  AuthText,
  AuthWrapper,
  AuthContent,
  FieldRow,
  FieldWrapper,
  GoBack,
  LoginForm,
  SignUpChangeWrapper,
  SocialIcons,
  StyledP,
  Wrapper,
  SignUpChangeContent,
  LogoContainer,
  BottomText,
} from "./styles";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = ({}) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const { refetch } = useMeQuery();
  const [signIn] = useSignInMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <ForgotEmailModal
        modalOpened={modalOpened}
        setModalOpened={() => setModalOpened(false)}
      />
      <NavLink to={ROUTES.LANDING_PAGE}>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </NavLink>
      <NavLink to={ROUTES.LANDING_PAGE}>
        <GoBack>
          <Cancel />
        </GoBack>
      </NavLink>
      <AuthWrapper>
        <Wave id="wave" />
        <AuthContent>
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
              onSubmit={async (
                values: SignInFormTypes,
                { setSubmitting, setErrors }
              ) => {
                // TODO: Update properly the meQuery
                const response = await signIn({ variables: values });
                if (response.data?.signIn.errors) {
                  setErrors(toErrorMap(response.data?.signIn.errors));
                } else if (response.data?.signIn.user) {
                  await refetch();
                  await router.push("/home");
                }
                await setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <StyledForm>
                  <FieldRow>
                    <FieldWrapper>
                      <Field
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                        component={Input}
                      ></Field>
                    </FieldWrapper>
                  </FieldRow>
                  <FieldRow>
                    <FieldWrapper active={passwordVisibility}>
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
                    loading={isSubmitting ? "Signing in..." : null}
                    marginTop="1em"
                    color="main"
                    disabled={!isValid}
                    type="submit"
                  >
                    Sign In
                  </Button>
                  <BottomText>
                    <p>Forgot your password?</p>

                    <span onClick={() => setModalOpened(true)}>Click here</span>
                  </BottomText>
                </StyledForm>
              )}
            </Formik>
          </LoginForm>
        </AuthContent>
        <Footer />
      </AuthWrapper>
      <SignUpChangeWrapper>
        <SignUpChangeContent
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <Heading size="h1" color="white" marginB="0.5em">
            New Here?
          </Heading>
          <StyledP>
            Sign up and discovver a great amount of new opportunities!
          </StyledP>
          <NavLink to={ROUTES.SIGN_UP}>
            <Button>Sign Up</Button>
          </NavLink>
        </SignUpChangeContent>
      </SignUpChangeWrapper>
    </Wrapper>
  );
};
export default SignIn;
