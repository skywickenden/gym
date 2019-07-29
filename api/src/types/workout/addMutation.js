const {
  GraphQLNonNull,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Add a workout item",
  args: {
    datetime: { type: GraphQLNonNull(GraphQLDateTime) },
  },
  resolve: (root, args) => {
    const workout = new model(args);
    return workout.save();
  }
};