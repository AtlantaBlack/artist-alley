// Shop products
const mongoose = require('mongoose');

const { Schema } = mongoose;

const merchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
    // required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  },
  createdBy: {
    type: String,
    required: true
  }
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;
