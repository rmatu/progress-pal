import React from "react";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import {
  useMeQuery,
  useSignInMutation,
  useSignUpMutation,
} from "../generated/graphql";

export const useSignIn = useSignInMutation;
export const useSignUp = useSignUpMutation;
export const withEmail = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (props: any) => {
    const { data, error, loading } = useMeQuery();

    if (loading) return null;

    if (data === undefined) return null;

    if (error || !data.me) {
      return <Redirect to={ROUTES.SIGN_IN} />;
    }

    if (data.me.emailVerified === true) {
      return <Redirect to={ROUTES.HOME} />;
    }

    return <Component {...(props as P)} />;
  };
};
