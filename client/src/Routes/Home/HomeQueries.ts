import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;

export const FEED_QUERY = gql`
  query seeFeed($isImg: Boolean!) {
    seeFeed(isImg: $isImg) {
      id
      title
      user {
        id
        url
        username
      }
      file {
        id
        url
        mimetype
      }
      likeCount
      isLiked
      createdAt
    }
  }
`;

export const FEED_ALL_QUERY = gql`
  query seeAllPost {
    seeAllPost {
      id
      user {
        id
        url
        username
      }
      title
      file {
        id
        url
        mimetype
      }
      likeCount
      createdAt
    }
  }
`;
