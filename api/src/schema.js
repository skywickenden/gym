const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const exerciseQuery = require("./types/exercise/query");
const exercisesQuery = require("./types/exercises/query");
const addExerciseMutation = require("./types/exercise/addMutation");
const deleteExerciseMutation = require("./types/exercise/deleteMutation");
const editExerciseMutation = require("./types/exercise/editMutation");

const workoutQuery = require("./types/workout/query");
const workoutExerciseQuery = require("./types/workoutExercise/query");
const workoutsQuery = require("./types/workouts/query");
const addWorkoutMutation = require("./types/workout/addMutation");
const appendWorkoutExerciseMutation = require("./types/workout/appendExerciseMutation");
const appendWorkoutExerciseRepMutation = require("./types/workout/appendRepMutation");
const deleteWorkoutMutation = require("./types/workout/deleteMutation");
const deleteWorkoutExerciseMutation = require("./types/workout/deleteExerciseMutation");
const editWorkoutMutation = require("./types/workout/editMutation");
const editWorkoutRepMutation = require("./types/workout/editRepMutation");

const deleteWorkoutRepMutation = require("./types/workout/deleteRepMutation");
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      Exercise: exerciseQuery,
      Exercises: exercisesQuery,
      Workout: workoutQuery,
      WorkoutExercise: workoutExerciseQuery,
      Workouts: workoutsQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      addExercise: addExerciseMutation,
      addWorkout: addWorkoutMutation,
      appendWorkoutExercise: appendWorkoutExerciseMutation,
      appendWorkoutExerciseRep: appendWorkoutExerciseRepMutation,
      deleteExercise: deleteExerciseMutation,
      deleteWorkout: deleteWorkoutMutation,
      deleteWorkoutExercise: deleteWorkoutExerciseMutation,
      deleteWorkoutRep: deleteWorkoutRepMutation,
      editExercise: editExerciseMutation,
      editWorkout: editWorkoutMutation,
      editWorkoutRep: editWorkoutRepMutation
    }
  })    
});