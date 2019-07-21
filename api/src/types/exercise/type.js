const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Exercise",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString }
  }
});