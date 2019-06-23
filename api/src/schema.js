const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const fooQuery = require("./types/foo/query");
const foosQuery = require("./types/foos/query");
const addFooMutation = require("./types/foo/addMutation");
const deleteFooMutation = require("./types/foo/deleteMutation");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      Foo: fooQuery,
      Foos: foosQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      addFoo: addFooMutation,
      deleteFoo: deleteFooMutation,
    }
  })    
});