const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: 'Foo',
  fields: {
    id: { type: GraphQLID },
    foobar: { type: GraphQLString }
  }
});