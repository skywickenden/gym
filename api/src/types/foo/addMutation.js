const {
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const FooType = require("./type");
const FooModel = require("./model");

module.exports = {
  type: FooType,
  args: {
    foobar: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, args, context, info) => {
    const foo = new FooModel(args);
    return foo.save();
  }
};