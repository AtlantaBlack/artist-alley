// Add typeDefs for GraphQL
const { gql } = require('apollo-server-express');

// const { dateScalar } = require('../scalars/date');

const typeDefs = gql`
  scalar dateScalar

  type User {
    _id: ID
    userType: String
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    birthday: dateScalar
    posts: [Post]
    orders: [Order]
  }

  type Post {
    _id: ID
    title: String
    description: String
    image: String
    postType: String
    likes: Int
    user: User
  }

  type Category {
    _id: ID
    name: String
  }

  type Merch {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    merch: [Merch]
  }

  type Auth {
    # token: ID
    user: User
  }

  type Query {
    users: [User]
    user(username: String): User
    posts: [Post]
    userPost(username: String!): [Post]
    allUserPosts: [User]
  }

  type Mutation {
    addUser(
      userType: String!
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      birthday: dateScalar!
    ): User

    login(email: String!, password: String!): Auth

    addPost(
      title: String
      description: String
      image: String
      createdBy: String!
      postType: String!
    ): Post
  }
`;

module.exports = typeDefs;
