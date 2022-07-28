// https://medium.com/@vrajparikh29/graphql-with-react-js-and-node-js-part-2-the-server-8571e0152fb1

// https://www.graphql-tools.com/docs/scalars#using-a-package

// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/

const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
    // .toLocaleDateString('en-GB');
  },
  serialize(value) {
    return value;
    // .toLocaleDateString('en-GB');
  }
});

module.exports = { dateScalar };
