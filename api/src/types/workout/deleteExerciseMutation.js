const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Delete an Exercise from a Workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    exerciseId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (root, args) => {
    const workout = await model.findById(args.id).exec();
    workout.exercises = workout.exercises.filter(exerciseWrapper => 
      exerciseWrapper.exercise.toString() !== args.exerciseId
    );
    return workout.save();
  }
};