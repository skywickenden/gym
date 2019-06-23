const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const FoosType = require("./type");
const FoosResolver = require("./resolver");

module.exports = {
  type: FoosType,
  description: "A collection of Foo",
  resolve: FoosResolver
};
