/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable func-names */
const jwt = require('jsonwebtoken');
require('dotenv').config();

// set session secret and expiry
const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if there's no token, return request
    if (!token) {
      return req;
    }

    // if there is a token, attempt to verify it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  // sign token with user details
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
