const {
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const FooType = require("./type");
const FooModel = require("./model");

module.exports = {
  type: FooType,
  description: "Add an item of Foo",
  args: {
    foobar: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, args) => {
    const foo = new FooModel(args);
    return foo.save();
  }
};