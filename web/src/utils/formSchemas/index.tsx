import * as Yup from "yup";

/**
 * * Sign In
 */

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string()
    .required("The password is required.")
    .min(8, "The password is to short"),
});

/**
 * * Sign Up
 */

export const SignUpInitialValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export interface SignUpFormTypes {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpSchema = Yup.object().shape({
  nickname: Yup.string()
    .required("Your nickname is required.")
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
