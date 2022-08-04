const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

require('dotenv').config();

// Authorisation middleware
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// set file limit to 13MB so users cannot upload an image larger than 16MB to the database
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
app.use(express.urlencoded({ limit: '13MB', extended: true }));
app.use(express.json({ limit: '13MB' }));

// Serving static images
app.use('images/', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new Apollo server instance with the GraphQL schema.

// Had to remove typeDefs and resolvers from async params to keep eslint happy
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`We're live! API server is running on port ${PORT}.`);
      // eslint-disable-next-line no-console
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Start the server
startApolloServer(typeDefs, resolvers);
