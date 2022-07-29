/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');
const { dateScalar } = require('../scalars/date');

// Add resolversfor GraphQL
const { User, Post } = require('../models');

const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return await User.find();
    },
    // find single user and display posts
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('posts');
    },

    // find all posts
    allUserPosts: async () => {
      return await User.find().populate('posts');
    }
  },

  Mutation: {
    // add new user

    addUser: async (
      parent,
      // eslint-disable-next-line object-curly-newline
      { userType, username, firstName, lastName, email, password, birthday }
    ) => {
      const user = await User.create({
        userType,
        username,
        firstName,
        lastName,
        email,
        password,
        birthday
      });
      return user;
    },

    // user login

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // const token = signToken(user);

      // return { token, user };
      return { user };
    },

    // add new post
    addPost: async (
      parent,
      // eslint-disable-next-line object-curly-newline
      { title, description, image, createdBy, postType }
    ) => {
      const newPost = await Post.create({
        title,
        description,
        image,
        createdBy,
        postType
      });
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { posts: newPost.id } }
      );
      return newPost;
    }
  },
  dateScalar
};

module.exports = resolvers;
