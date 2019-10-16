const {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
  } = require("graphql");
  const ExerciseType = require("../exercise/type");
  
  module.exports = new GraphQLObjectType({
    name: "WorkoutExerciseType",
    fields: {
      id: { type: GraphQLID },
      exercisesx: { type: GraphQLString },
    //   exercise: {type: new GraphQLNonNull(ExerciseType)},
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
    }
  });