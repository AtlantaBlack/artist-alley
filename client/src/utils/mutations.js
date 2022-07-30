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
  mutation Mutation(
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

//add token to the above once we've worked out the auth stuff
