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

/**
 * * Reset Password
 */

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("The password is required.")
    .min(8, "The password is to short"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("Confirm your password."),
});

export interface ResetPasswordTypes {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordValues = {
  password: "",
  confirmPassword: "",
};

/**
 * * Onboarding General Info
 */

export const GeneralInfoSchema = Yup.object().shape({
  birthDate: Yup.string()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      "Invalid date",
    )
    .max(10, "Invalid date")
    .required("Birthday is required"),
  height: Yup.number()
    .min(100, "Min height is 100cm")
    .max(300, "Max height is 360cm")
    .required("Height is required"),
  weight: Yup.number()
    .min(25, "Min wieght is 25")
    .max(635, "Max height is 635")
    .required("Weight is required"),
  weightGoalValue: Yup.number()
    .min(25, "Min wieght is 25")
    .max(635, "Max height is 635")
    .required("Goal is required"),
});

export const GeneralInfoInitialValues = {
  birthDate: "",
  height: "",
  weight: "",
  weightGoalValue: "",
};

/**
 * * Add Workout
 */

export interface ISet {
  id: number;
  weight: number | null;
  reps: number | null;
}

export interface IExportedExercise {
  id: string;
  name: string;
  isCommonExercise: boolean;
  sets: ISet[];
}

export const AddWorkoutSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, "Maximum of 40 characters")
    .required("Exercise name is required"),
  exercises: Yup.object().shape({
    name: Yup.string(),
    sets: Yup.array().of(
      Yup.object().shape({
        id: Yup.number(),
        kg: Yup.number(),
        reps: Yup.number(),
      }),
    ),
  }),
});

export const SearchSchema = Yup.object().shape({
  search: Yup.string(),
});

export const WeightChartSchema = Yup.object().shape({
  weight: Yup.number()
    .min(1, "Min weight is 1kg")
    .max(999, "Max weight is 999kg")
    .required("Fill the input"),
  date: Yup.string()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
      "Invalid date",
    )
    .max(10, "Invalid date")
    .required("Birthday is required"),
});
