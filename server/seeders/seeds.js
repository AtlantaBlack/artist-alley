/* eslint-disable */
const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    await Post.deleteMany({});

    // create post seeds and push to post array for each user
    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, createdBy } = await Post.create(postSeeds[i]);

      const user = await User.findOneAndUpdate(
        { username: createdBy },
        {
          $addToSet: {
            posts: _id
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Database seeded!');
  process.exit(0);
});
