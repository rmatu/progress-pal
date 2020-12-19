import { ApolloClient, split, HttpLink, ApolloLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "apollo-utilities";
import { cache } from "./cache";

const httpUri = process.env.REACT_APP_SERVER_URL + "/graphql";
console.log(httpUri);
const wsUri = httpUri.replace(/^http?/, "ws");
console.log(wsUri);

const httpLink = new HttpLink({
  uri: httpUri,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    // Automatic reconnect in case of connection error
    reconnect: true,
  },
});

export interface Definition {
  kind: string;
  operation?: string;
}

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    // If this is a subscription query, use wsLink, otherwise use httpLink
    return kind === "OperationDefinition" && operation === "subscription";
  },

  wsLink as any,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

export const client = new ApolloClient({
  link,
  cache,
});
