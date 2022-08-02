import { gql } from '@apollo/client';

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
      createdBy
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!, $createdBy: String) {
    removePost(postId: $postId, createdBy: $createdBy) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $title: String, $description: String) {
    updatePost(postId: $postId, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

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

export const REMOVE_MERCH = gql`
  mutation removeMerch($merchId: ID!) {
    removeMerch(merchId: $merchId) {
      _id
      name
      description
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($postId: ID!, $likes: Int) {
    addLike(postId: $postId, likes: $likes) {
      _id
      title
      createdBy
      likes
    }
  }
`;

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

//add token to the above once we've worked out the auth stuff
