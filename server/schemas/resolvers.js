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
    // find all users and populate posts, merch and liked posts
    users: async () => {
      return await User.find({})
        .populate('posts')
        .populate('merch')
        .populate('likedPosts');
    },

    // find single user by username and populate posts, merch and liked posts
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
        .populate('posts')
        .populate('merch')
        .populate('likedPosts');
      return user;
    },

    // find single artist by id and populate posts and liked posts
    artist: async (parent, { artistId }) => {
      const artist = await User.findOne({ _id: artistId })
        .populate('posts')
        .populate('likedPosts');
      return artist;
    },

    // find single artist shop by id and populate merch
    artistShop: async (parent, { artistId }) => {
      const artistShop = await User.findOne({ _id: artistId }).populate(
        'merch'
      );
      return artistShop;
    },

    // find all posts, sort by descending order and populate likes
    posts: async () => {
      return await Post.find({}).sort({ createdAt: 'desc' }).populate('likes');
    },

    // find single post by id and populate likes
    singlePost: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId }).populate('likes');
    },

    // find merch store by username and populate merch
    merch: async (parent, { username }) => {
      const merch = await User.findOne({ username }).populate('merch');
      return merch;
    }
  },

  Mutation: {
    // add new user
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
    // find single user by email and authenticate their credentials to allow login
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

    // add new post
    addPost: async (parent, { title, description, image, createdBy }) => {
      const newPost = await Post.create({
        title,
        description,
        image,
        createdBy
      });
      // Update the user's posts by adding the postID to the array of posts in the user model
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { posts: newPost.id } }
      );
      return newPost;
    },

    // remove post
    removePost: async (parent, { postId, createdBy }) => {
      const removePost = await Post.findByIdAndDelete({
        _id: postId
      });
      // Update the user's posts by removing the postID to the array of posts in the user model
      // https://stackoverflow.com/questions/48988019/mongoose-pull-objectid-from-array
      await User.findOneAndUpdate(
        { username: createdBy },
        { $pullAll: { posts: [postId] } },
        { new: true }
      );
      return removePost;
    },

    // update post resolver for future use
    updatePost: async (parent, { title, description, postId }) => {
      const updatePost = await Post.findByIdAndUpdate(
        { _id: postId },
        { $set: { title, description } },
        { new: true }
      );
      return updatePost;
    },

    // add single merch to store
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
      // Update the user's merch by adding the merchID to the array of merch in the user model
      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { merch: addToStore.id } }
      );
      return addToStore;
    },

    // remove merch
    removeMerch: async (parent, { createdBy, merchId }) => {
      const removeMerch = await Merch.findByIdAndDelete({ _id: merchId });

      // Update the user's merch by adding the merchID to the array of merch in the user model
      // https://stackoverflow.com/questions/48988019/mongoose-pull-objectid-from-array
      await User.findOneAndUpdate(
        { username: createdBy },
        { $pullAll: { merch: [merchId] } },
        { new: true }
      );
      return removeMerch;
    },

    // like post
    addLike: async (parent, { postId, userId }) => {
      const addLike = await Post.findByIdAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId } },
        { new: true }
      );
      // Update the user's likes by adding the postID to the array of merch in the user model
      // this allows users to only like a post once
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
