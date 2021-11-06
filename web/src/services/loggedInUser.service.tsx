import React from "react";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useMeQuery } from "../generated/graphql";

export const withRedirectLoggedInUser = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (props: any) => {
    const { data, error, loading } = useMeQuery();

    if (loading) return null;

    if (data === undefined) return <Component {...(props as P)} />;

    if (error || !data.me) {
      return <Component {...(props as P)} />;
    }

    if (data.me.emailVerified === true) {
      return <Redirect to={ROUTES.MAIN_PAGE} />;
    }

    return <Redirect to={ROUTES.MAIN_PAGE} />;
  };
};
