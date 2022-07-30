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
      console.log(user);
    },
    posts: async () => {
      return await Post.find({}).populate('user');
    },

    userPost: async (parent, { username }) => {
      return await User.findOne({ username }).populate('post');
    }
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
      { title, description, image, createdBy, postType }
    ) => {
      // console.log(createdBy);
      const newPost = await Post.create({
        title,
        description,
        image,
        createdBy,
        postType
      });
      // console.log(newPost);
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { posts: newPost.id } }
      );
      return newPost;
    },

    removePost: async (parent, { postId, createdBy }) => {
      const post = await Post.findByIdAndDelete({
        _id: postId
      });
      console.log(post);

      const user = await User.findOneAndUpdate(
        { username: createdBy },
        { $pull: { post: { _id: postId } } }
      );
      console.log(user);
      return post;
    }
  },
  dateScalar
};

module.exports = resolvers;
