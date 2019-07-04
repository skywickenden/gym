const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const exerciseQuery = require("./types/exercise/query");
const addExerciseMutation = require("./types/exercise/addMutation");
const deleteExerciseMutation = require("./types/exercise/deleteMutation");
const fooQuery = require("./types/foo/query");
const foosQuery = require("./types/foos/query");
const addFooMutation = require("./types/foo/addMutation");
const deleteFooMutation = require("./types/foo/deleteMutation");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      Exercise: exerciseQuery,
      Foo: fooQuery,
      Foos: foosQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      addExercise: addExerciseMutation,
      addFoo: addFooMutation,
      deleteFoo: deleteFooMutation,
      deleteExercise: deleteExerciseMutation
    }
  })    
});