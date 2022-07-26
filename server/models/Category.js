// Merch categories
// hard code these options, such as:
// mug, badge, print, cushion, tote bag, sticker, etc

const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
