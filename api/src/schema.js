const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const fooQuery = require("./types/foo/query");
const addFooMutation = require("./types/foo/addMutation");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      foo: fooQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      addFoo: addFooMutation
    }
  })    
});