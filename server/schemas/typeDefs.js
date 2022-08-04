// Add typeDefs for GraphQL
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # custom dateScalar because GraphQL doesn't do dates as a type definition
  scalar dateScalar

  # user model
  type User {
    _id: ID
    userType: String
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    birthday: dateScalar
    orders: [Order]
    posts: [Post]
    merch: [Merch]
    likedPosts: [Post]
  }

  # post model
  type Post {
    _id: ID
    title: String
    description: String
    image: String
    likes: [User]
    user: User
    createdBy: String
    createdAt: String
  }

  # category model for future use to allow users to tag posts and merch
  type Category {
    _id: ID
    name: String
  }

  # merch model
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

  # order model for future use when integrated with stripe
  type Order {
    _id: ID
    purchaseDate: String
    merch: [Merch]
  }

  # auth model
  type Auth {
    token: ID!
    user: User
  }

  # queries
  type Query {
    users: [User]
    user(username: String!): User
    artist(artistId: ID!): User
    artistShop(artistId: ID!): User
    posts: [Post]
    merch(username: String!): User
    singlePost(postId: ID!): Post
  }
  # mutations model
  type Mutation {
    addUser(
      userType: String!
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      birthday: dateScalar!
    ): Auth

    addPost(
      title: String
      description: String
      image: String
      createdBy: String
    ): Post

    login(email: String!, password: String!): Auth

    removePost(postId: ID!, createdBy: String): Post

    updatePost(postId: ID!, title: String, description: String): Post

    addToStore(
      name: String!
      description: String!
      image: String
      price: Float!
      quantity: Int!
      createdBy: String!
    ): Merch

    removeMerch(merchId: ID!, createdBy: String): Merch

    addLike(postId: ID!, userId: ID!): Post
  }
`;

module.exports = typeDefs;
