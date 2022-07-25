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
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
