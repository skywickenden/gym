const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const FooType = require("./type");
const FooResolver = require("./resolver");

module.exports = {
  type: FooType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve: FooResolver
};
