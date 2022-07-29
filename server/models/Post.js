// Artworks posts
const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  postType: {
    type: String,
    enum: ['Sell', 'Portfolio'],
    required: true
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  },
  createdBy: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
