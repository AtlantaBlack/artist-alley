// require the models
const User = require('./User');
const Post = require('./Post');
const Merch = require('./Merch');
const Order = require('./Order');
const Category = require('./Category');

// and export them
module.exports = {
  User,
  Post,
  Category,
  Merch,
  Order
};
