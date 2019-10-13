import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation emailSignIn($email: String!, $password: String!) {
    emailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      email: $email
      username: $username
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
