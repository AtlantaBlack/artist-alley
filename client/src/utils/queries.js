import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      description
      image
      createdBy
      likes {
        _id
        username
      }
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
      createdBy
      likes {
        _id
        username
      }
    }
  }
`;

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
      }
      likedPosts {
        _id
        title
      }
    }
  }
`;

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
      }
      likedPosts {
        _id
        title
      }
    }
  }
`;

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
