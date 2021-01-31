import * as Yup from "yup";

/**
 * * Sign In
 */

export interface SignInFormTypes {
  usernameOrEmail: string;
  password: string;
}

export const SignInInitialValues = {
  usernameOrEmail: "",
  password: "",
};

export const SignInSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or email is required."),
  password: Yup.string()
    .required("The password is required.")
    .min(3, "The password is to short"),
});

export const ForgetEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("The email is required"),
});

export interface ForgetEmailTypes {
  email: string;
}

export const ForgetEmailInitialValues = {
  email: "",
};

/**
 * * Sign Up
 */

export interface SignUpFormTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required("Your username is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string()
    .required("The password is required.")
    .min(1, "The password is to short"),
  confirmPassword: Yup.string()
    //Getting the reference to the password
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("Confirm your password."),
});
