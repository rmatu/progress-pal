import { Field, Formik } from "formik";
import React, { useState } from "react";
//@ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { NavLink } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../assets/svg/cancel.svg";
import { ReactComponent as EyeIcon } from "../../../assets/svg/eye.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/google-plus.svg";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as SideWave } from "../../../assets/svg/sideWave.svg";
import { ReactComponent as Wave } from "../../../assets/svg/signInWave.svg";
import Footer from "../../../components/Footer/Footer";
import {
  Button,
  Heading,
  Input,
  Popup,
  Separator,
} from "../../../components/UI";
import { StyledForm } from "../../../components/UI/FormElements";
import * as ROUTES from "../../../constants/routes";
import {
  useMeQuery,
  useSignInMutation,
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
} from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";
import {
  SignInFormTypes,
  SignInInitialValues,
  SignInSchema,
} from "../../../utils/formSchemas";
import { toErrorMap } from "../../../utils/toErrorMap";
import ForgotEmailModal from "./ForgotEmailModal/ForgotEmailModal";
import {
  AuthContent,
  AuthText,
  AuthWrapper,
  BottomText,
  FieldRow,
  FieldWrapper,
  GoBack,
  LoginForm,
  LogoContainer,
  SideWaveWrapper,
  SignUpChangeContent,
  SignUpChangeWrapper,
  SocialIcons,
  StyledP,
  Wrapper,
} from "./styles";

interface SignInProps {}

/**
 * TODO: Facebook login has to be called from https page. Http is not secured right now.
 * TODO: Login with Facebook and Google could be extracted from here and be more generic
 */

const SignIn: React.FC<SignInProps> = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const { refetch } = useMeQuery();
  const [signIn] = useSignInMutation();
  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithFacebook] = useSignInWithFacebookMutation();
  const router = useRouter();

  const responseGoogle = async (response: any) => {
    if (response.profileObj) {
      const { email } = response.profileObj;
      try {
        const res = await signInWithGoogle({
          variables: {
            email,
          },
        });
        if (res.data?.signInWithGoogle.user) {
          await refetch();
          router.push(ROUTES.MAIN_PAGE);
        } else if (res.data?.signInWithGoogle.errors) {
          setErrorText(res.data?.signInWithGoogle.errors[0].message);
          setShowErrorPopup(true);
          setTimeout(() => {
            setShowErrorPopup(false);
          });
        }
      } catch (e) {
        setShowErrorPopup(true);
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 5000);
      }
    }
  };

  const responseFacebook = async (response: any) => {
    console.log(response);

    const { email } = response;
    try {
      const res = await signInWithFacebook({
        variables: {
          email,
        },
      });
      if (res.data?.signInWithFacebook.user) {
        await refetch();
        router.push(ROUTES.MAIN_PAGE);
      } else if (res.data?.signInWithFacebook.errors) {
        setErrorText(res.data?.signInWithFacebook.errors[0].message);
        setShowErrorPopup(true);
        setTimeout(() => {
          setShowErrorPopup(false);
        });
      }
    } catch (e) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    }
  };

  return (
    <Wrapper>
      <ForgotEmailModal
        modalOpened={modalOpened}
        setModalOpened={() => setModalOpened(false)}
        showPopup={() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 4000);
        }}
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
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              callback={responseFacebook}
              fields="email"
              // @ts-ignore
              render={renderProps => (
                <FacebookIcon onClick={renderProps.onClick} />
              )}
            />
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID as string}
              render={renderProps => (
                <GoogleIcon onClick={renderProps.onClick} />
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </SocialIcons>
          <LoginForm>
            <Separator />
            <Formik
              isInitialValid={false}
              initialValues={SignInInitialValues}
              validationSchema={SignInSchema}
              onSubmit={async (
                values: SignInFormTypes,
                { setSubmitting, setErrors },
              ) => {
                // TODO: Update properly the meQuery
                const response = await signIn({ variables: values });
                if (response.data?.signIn.errors) {
                  setErrors(toErrorMap(response.data?.signIn.errors));
                  if (response.data?.signIn.errors[0].field === "Popup") {
                    setErrorText(response.data?.signIn.errors[0].message);
                    setShowErrorPopup(true);
                    setTimeout(() => {
                      setShowErrorPopup(false);
                    }, 5000);
                  }
                } else if (response.data?.signIn.user) {
                  await refetch();
                  router.push(ROUTES.MAIN_PAGE);
                }
                setSubmitting(false);
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
      <SideWaveWrapper>
        <SideWave id="sideWave" />
      </SideWaveWrapper>
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
      <Popup showPopup={showErrorPopup} error={true}>
        {errorText}
      </Popup>

      <Popup showPopup={showPopup}>Email has been sent successfully!</Popup>
    </Wrapper>
  );
};
export default SignIn;
