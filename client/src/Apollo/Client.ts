import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Operation
  // split,
  // concat
} from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
import { createUploadLink } from "apollo-upload-client";
import { withClientState } from "apollo-link-state";
// import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
// import { WebSocketLink } from "apollo-link-ws";
import { toast } from "react-toastify";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
});

export const host = "http://localhost:4000";
const uri = host + "/graphql";

const uploadLink = createUploadLink({ uri });

// const wsLink = new WebSocketLink({
//   options: {
//     connectionParams: {
//       "X-JWT": getToken()
//     },
//     reconnect: true
//   },
//   uri
// });

// const combinedLink = split(
//   ({ query }) => {
//     const { kind, operation }: any = getMainDefinition(query);
//     return kind === "OperationDefinition" && operation === "subscription";
//   },
//   wsLink,
//   uploadLink
// );

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    authMiddleware,
    uploadLink
    // concat(authMiddleware, combinedLink)
  ])
});

export default client;
