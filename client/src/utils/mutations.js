// import GraphQL from Apollo
import { gql } from '@apollo/client';

// database mutations with GraphQL
// add new user
export const ADD_USER = gql`
  mutation addUser(
    $userType: String!
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $birthday: Date!
  ) {
    addUser(
      userType: $userType
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      birthday: $birthday
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// login authentication
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// add post
export const ADD_POST = gql`
  mutation addPost(
    $title: String
    $description: String
    $image: String
    $createdBy: String!
  ) {
    addPost(
      title: $title
      description: $description
      image: $image
      createdBy: $createdBy
    ) {
      title
      image
      description
    }
  }
`;

// remove post
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!, $createdBy: String) {
    removePost(postId: $postId, createdBy: $createdBy) {
      _id
      title
      description
    }
  }
`;

// update post for future use
export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $title: String, $description: String) {
    updatePost(postId: $postId, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

// add merch to artist store
export const ADD_MERCH = gql`
  mutation addToStore(
    $name: String!
    $price: Float!
    $quantity: Int!
    $image: String
    $createdBy: String!
    $description: String!
  ) {
    addToStore(
      name: $name
      price: $price
      quantity: $quantity
      image: $image
      createdBy: $createdBy
      description: $description
    ) {
      name
      description
      image
      price
      quantity
    }
  }
`;

// remove merch from artist store
export const REMOVE_MERCH = gql`
  mutation removeMerch($merchId: ID!) {
    removeMerch(merchId: $merchId) {
      _id
      name
      description
    }
  }
`;

// add a like to a post
export const ADD_LIKE = gql`
  mutation addLike($postId: ID!, $userId: ID!) {
    addLike(postId: $postId, userId: $userId) {
      _id
      title
      createdBy
      likes {
        _id
        username
      }
    }
  }
`;

// edit single post for future use
export const SINGLE_POST = gql`
  query singlePost($postId: ID!) {
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
