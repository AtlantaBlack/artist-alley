// import GraphQL from Apollo
import { gql } from '@apollo/client';

// database queries with GraphQL
// get all posts
export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      description
      image
      createdBy
      createdAt
      likes {
        _id
        username
      }
    }
  }
`;

// get single post
export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    singlePost(postId: $postId) {
      _id
      title
      image
      description
      createdBy
      likes {
        _id
        username
      }
    }
  }
`;

// get single user by username
export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      userType
      posts {
        _id
        title
        description
        image
        createdBy
        createdAt
      }
      likedPosts {
        _id
        title
      }
    }
  }
`;

// get single artist by ID
export const QUERY_ARTIST = gql`
  query Artist($artistId: ID!) {
    artist(artistId: $artistId) {
      _id
      username
      userType
      posts {
        _id
        title
        description
        image
        createdBy
        createdAt
      }
      likedPosts {
        _id
        title
      }
    }
  }
`;

// get single artist shop by artist ID
export const QUERY_ARTIST_SHOP = gql`
  query ArtistShop($artistId: ID!) {
    artistShop(artistId: $artistId) {
      _id
      username
      userType
      merch {
        _id
        name
        image
        price
      }
    }
  }
`;

// find merch by user ID
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
