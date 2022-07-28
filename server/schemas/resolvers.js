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
      return user;
    }
  }
};

module.exports = resolvers;
