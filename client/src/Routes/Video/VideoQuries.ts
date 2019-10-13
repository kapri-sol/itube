import { gql } from "apollo-boost";

export const GET_VIDEO = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      title
      content
      views
      likeCount
      createdAt
      user {
        id
        url
        username
        isSubscribe
        isSelf
      }
      file {
        url
        mimetype
      }
      comments {
        id
        user {
          url
          username
        }
        text
        updatedAt
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      username
      url
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
    }
  }
`;

export const SUBSCRIBE = gql`
  mutation subscribe($postId: String!) {
    subscribe(postId: $postId)
  }
`;

export const EDIT_POST = gql`
  mutation editPost($id: String!, $title: String!, $content: String!) {
    editPost(id: $id, title: $title, content: $content) {
      title
      content
    }
  }
`;
