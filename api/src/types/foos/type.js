const {
  GraphQLList
} = require("graphql");
const Foo = require("../foo/type");

module.exports =  new GraphQLList(Foo);
