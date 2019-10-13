import { gql } from "apollo-boost";

export const SUBSCRIBE = gql`
  mutation subscribe($id: String!) {
    subscribe(id: $id)
  }
`;

export const UNSUBSCRIBE = gql`
  mutation unsubscribe($id: String!) {
    unsubscribe(id: $id)
  }
`;
