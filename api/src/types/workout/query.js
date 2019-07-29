const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const resolver = require("./resolver");

module.exports = {
  type: type,
  description: "A Workout item",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve: resolver
};