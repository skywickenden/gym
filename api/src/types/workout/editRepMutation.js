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
  description: "Edit a Rep from from an Exercise in a Workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    exerciseId: { type: GraphQLNonNull(GraphQLID) },
    repIndex: { type: GraphQLNonNull(GraphQLInt) },
    weight: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    distance: { type: GraphQLFloat },
    timespan: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    const workout = await model.findById(args.id).exec();
    workout.exercises.forEach(row => {
      if (row.exercise.toString() === args.exerciseId) {
        row.reps[args.repIndex].weight = args.weight;
        row.reps[args.repIndex].quantity = args.quantity;
        row.reps[args.repIndex].distance = args.distance;
        row.reps[args.repIndex].timespan = args.timespan;
      }
    });
    return workout.save();
  }
};