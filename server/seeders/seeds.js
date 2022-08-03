/* eslint-disable no-console */
const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});

    await User.create(userSeeds);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Database seeded with users!');
  process.exit(0);
});
