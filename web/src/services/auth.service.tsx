import { useApolloClient } from "@apollo/client";
import React, { useCallback } from "react";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import {
  useMeQuery,
  useSignInMutation,
  useSignUpMutation,
} from "../generated/graphql";

export const useSignIn = useSignInMutation;
export const useSignUp = useSignUpMutation;
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: any) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === ROUTES.SIGN_IN) {
        return null;
      }
      return <Redirect to={ROUTES.SIGN_IN} />;
    }
    const signOut = useSignOut();
    const { data, error, loading } = useMeQuery();

    if (loading) return null;
    if (data === undefined) return null;
    if (error || !data.me) {
      signOut();
      return <Redirect to={ROUTES.SIGN_IN} />;
    }
    return <Component {...(props as P)} />;
  };
};
export const useSignOut = () => {
  const client = useApolloClient();

  return useCallback(() => {
    // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
    // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
    document.cookie = `authToken=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client]);
};

export const isSignedIn = () => {
  return /authToken=.+(;|$)/.test(document.cookie);
};
