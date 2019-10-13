import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      url
      username
      subscribesCount
      subscribersCount
      postsCount
      isSelf
      posts {
        id
        title
        user {
          username
          url
        }
        likeCount
        isLiked
        commentCount
        file {
          url
          mimetype
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;
