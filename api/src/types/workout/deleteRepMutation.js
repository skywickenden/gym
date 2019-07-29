const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Delete a Rep from from an Exercise in a Workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    exerciseId: { type: GraphQLNonNull(GraphQLID) },
    repIndex: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (root, args) => {
    const workout = await model.findById(args.id).exec();
    workout.exercises.forEach(row => {
      if (row.exercise.toString() === args.exerciseId) {
        row.reps.splice(args.repIndex, 1);
      }
    });
    return workout.save();
  }
};