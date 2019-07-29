const {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Append a rep to a Workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    exerciseId: { type: GraphQLNonNull(GraphQLID) },
    weight: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    distance: { type: GraphQLFloat },
    timespan: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    const workout = await model.findById(args.id).exec();
    const exercise = workout.exercises
      .find(row => row.exercise.toString() === args.exerciseId);
    exercise.reps.push({
      weight: args.weight,
      quantity: args.quantity,
      distance: args.distance,
      timespan: args.timespan
    });
    return workout.save();
  }
};