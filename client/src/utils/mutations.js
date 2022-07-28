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
      userType
      username
      firstName
      lastName
      email
      password
      birthday
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      # token
      user {
        _id
      }
    }
  }
`;

//add token to the above once we've worked out the auth stuff
