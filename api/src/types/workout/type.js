const {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const ExerciseType = require("../exercise/type");

module.exports = new GraphQLObjectType({
  name: "Workout",
  fields: {
    id: { type: GraphQLID },
    datetime: { type: GraphQLDateTime },
    exercises: { type: new GraphQLList(
      new GraphQLObjectType({
        name: "WorkoutExercise",
        fields: {
          exercise: {type: new GraphQLNonNull(ExerciseType)},
          reps: {
            type: new GraphQLList(
              new GraphQLObjectType({
                name: "Reps",
                fields: {
                  weight: { type: GraphQLFloat },
                  quantity: { type: GraphQLInt },
                  distance: { type: GraphQLFloat },
                  timespan: { type: GraphQLString }
                }
              })
            )
          }
        }
      })
    )},
  }
});