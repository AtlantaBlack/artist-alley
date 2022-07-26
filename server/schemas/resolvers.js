/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */

// Add resolversfor GraphQL
const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    }
  }
};

module.exports = resolvers;
