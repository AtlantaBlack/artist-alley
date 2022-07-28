import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      title
      description
      image
      likes
      user {
        username
      }
    }
  }
`;
