const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const exerciseQuery = require("./types/exercise/query");
const exercisesQuery = require("./types/exercises/query");
const addExerciseMutation = require("./types/exercise/addMutation");
const deleteExerciseMutation = require("./types/exercise/deleteMutation");
const editExerciseMutation = require("./types/exercise/editMutation");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      Exercise: exerciseQuery,
      Exercises: exercisesQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      addExercise: addExerciseMutation,
      deleteExercise: deleteExerciseMutation,
      editExercise: editExerciseMutation
    }
  })    
});