import { gql } from "apollo-boost";

export const CREATE_FILE = gql`
  mutation createFile($file: Upload!) {
    createFile(file: $file) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($fileId: String!, $title: String!, $content: String!) {
    createPost(fileId: $fileId, title: $title, content: $content) {
      id
    }
  }
`;
