/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { dateScalar } = require('../scalars/date');

// Add models for GraphQL
const { User, Post } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username }).populate('posts');
      return user;
    },
    posts: async () => {
      return await Post.find({});
    }

    // userPost: async (parent, { username }) => {
    //   return await User.findOne({ username }).populate('post');
    // }
  },

  Mutation: {
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
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (
      parent,
      // eslint-disable-next-line object-curly-newline
      { title, description, image, createdBy }
    ) => {
      // console.log(createdBy);
      const newPost = await Post.create({
        title,
        description,
        image,
        createdBy
      });
      // console.log(newPost);
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { posts: newPost.id } }
      );
      return newPost;
    },

    removePost: async (
      parent,
      // eslint-disable-next-line object-curly-newline
      { createdBy, postId }
    ) => {
      const removePost = await Post.findByIdAndDelete({
        _id: postId
      });

      // https://stackoverflow.com/questions/48988019/mongoose-pull-objectid-from-array
      await User.findOneAndUpdate(
        { username: createdBy },
        { $pullAll: { posts: [postId] } },
        { new: true }
      );

      return removePost;
    },

    updatePost: async (parent, { title, description, postId }) => {
      const updatePost = await Post.findByIdAndUpdate(
        { _id: postId },
        { $set: { title, description } },
        { new: true }
      );
      return updatePost;
    }
  },
  dateScalar
};

module.exports = resolvers;
