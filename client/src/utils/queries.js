import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      description
      image
      likes
      createdBy
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    singlePost(postId: $postId) {
      _id
      title
      image
      description
      likes
      createdBy
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      userType
      # username
      # firstName
      # lastName
      posts {
        _id
        title
        description
        image
        createdBy
      }
    }
  }
`;

export const QUERY_USER_MERCH = gql`
  query userMerch($username: String!) {
    merch(username: $username) {
      merch {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;
