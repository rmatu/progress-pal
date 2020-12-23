import { ApolloClient, HttpLink } from "@apollo/client";
import { cache } from "./cache";

const httpUri = process.env.REACT_APP_SERVER_URL + "/graphql";

const link = new HttpLink({
  uri: httpUri,
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache,
});
