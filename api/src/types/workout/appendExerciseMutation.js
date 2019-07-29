const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Append an Exercise to a Workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    exerciseId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (root, args) => {
    const workout = await model.findById(args.id).exec();
    workout.exercises.push({
      exercise: args.exerciseId,
      reps: [{
        weight: 1,
        quantity: 1,
        distance: 100,
        timespan: "00:00:30"
      }]
    });
    return workout.save();
  }
};