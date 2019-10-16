const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const WorkoutExerciseType = require("../workoutExercise/type");
const ExerciseType = require("../exercise/type");

module.exports = new GraphQLObjectType({
  name: "Workout",
  fields: () => ({
    id: { type: GraphQLID },
    datetime: { type: GraphQLDateTime },
    // exercisesr: { type: new GraphQLList(WorkoutExerciseType)},
    exercisesr: { type: new GraphQLList(ExerciseType)},
    // module.exports = new GraphQLList(ExerciseType);
    // exercisesr: { 
    //   type: new GraphQLList(
    //     new GraphQLObjectType({
    //       name: "WorkoutExercisex",
    //       fields: {
    //         id: { type: GraphQLID },
    //         exercisesx: {type: new GraphQLNonNull(ExerciseType)},
    //       }
    //     })
    //   ) 
    // }
  })
});

    //   reps: {
    //     type: new GraphQLList(
    //       new GraphQLObjectType({
    //         name: "Reps",
    //         fields: {
    //           weight: { type: GraphQLFloat },
    //           quantity: { type: GraphQLInt },
    //           distance: { type: GraphQLFloat },
    //           timespan: { type: GraphQLString }
    //         }
    //       })
    //     )
    //   }