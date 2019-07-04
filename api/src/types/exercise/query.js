const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const resolver = require("./resolver");

module.exports = {
  type: type,
  description: "An Exercise item",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve: resolver
};