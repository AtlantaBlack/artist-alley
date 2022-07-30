import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      description
      image
      likes
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      username
      firstName
      lastName
      posts {
        _id
        title
      }
    }
  }
`;
