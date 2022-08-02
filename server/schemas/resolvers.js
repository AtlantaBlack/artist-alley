/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { dateScalar } = require('../scalars/date');

// Add models for GraphQL
const { User, Post, Merch } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({})
        .populate('posts')
        .populate('merch')
        .populate('likedPosts');
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
        .populate('posts')
        .populate('merch')
        .populate('likedPosts');
      return user;
    },
    artist: async (parent, { artistId }) => {
      const artist = await User.findOne({ _id: artistId })
        .populate('posts')
        .populate('likedPosts');
      return artist;
    },
    artistShop: async (parent, { artistId }) => {
      const artistShop = await User.findOne({ _id: artistId }).populate(
        'merch'
      );
      return artistShop;
    },
    posts: async () => {
      return await Post.find({}).populate('likes');
    },
    singlePost: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId }).populate('likes');
    },
    merch: async (parent, { username }) => {
      const merch = await User.findOne({ username }).populate('merch');
      return merch;
    }
  },

  Mutation: {
    addUser: async (
      parent,
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

    addPost: async (parent, { title, description, image, createdBy }) => {
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

    removePost: async (parent, { postId, createdBy }) => {
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
    },

    addToStore: async (
      parent,
      { name, description, image, price, quantity, createdBy }
    ) => {
      const addToStore = await Merch.create({
        name,
        description,
        image,
        price,
        quantity,
        createdBy
      });
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { merch: addToStore.id } }
      );
      return addToStore;
    },

    removeMerch: async (parent, { createdBy, merchId }) => {
      const removeMerch = await Merch.findByIdAndDelete({ _id: merchId });
      // https://stackoverflow.com/questions/48988019/mongoose-pull-objectid-from-array
      await User.findOneAndUpdate(
        { username: createdBy },
        { $pullAll: { merch: [merchId] } },
        { new: true }
      );
      return removeMerch;
    },

    addLike: async (parent, { postId, userId }) => {
      const addLike = await Post.findByIdAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { likedPosts: postId } },
        { new: true }
      );
      return addLike;
    }
  },
  dateScalar
};

module.exports = resolvers;
