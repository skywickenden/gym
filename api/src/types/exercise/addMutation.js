const {
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Add an an exercise item",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  },
  resolve: (root, args) => {
    const exercise = new model(args);
    return exercise.save();
  }
};