// Add database connection mongoose and mongoDb
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
require('dotenv').config();

// set environment variables for heroku deployment or localhost
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
