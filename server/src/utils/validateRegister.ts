import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";
import { EMAIL_REGEX } from "../constants";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!EMAIL_REGEX.test(String(options.email).toLowerCase())) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (options.username.length > 25) {
    return [
      {
        field: "username",
        message: "Length must be lower than 25",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (options.password.length > 25) {
    return [
      {
        field: "password",
        message: "Length must be lower than 25",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username can't include an @ sign",
      },
    ];
  }

  return null;
};
