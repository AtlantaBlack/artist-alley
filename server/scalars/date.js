// https://medium.com/@vrajparikh29/graphql-with-react-js-and-node-js-part-2-the-server-8571e0152fb1

// https://www.graphql-tools.com/docs/scalars#using-a-package

// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
// custom scalar so that the date for DOB in the database is correct

const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    // Append Z to the value so that it is in UTC
    // https://www.mongodb.com/community/forums/t/save-date-of-birth-of-user-without-timezone/9155/8
    const dateVal = `${value}Z`;
    return new Date(dateVal);
  },
  serialize(value) {
    return value;
  }
});

module.exports = { dateScalar };
