const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const FooType = require("./type");
const FooModel = require("./model");

module.exports = {
  type: FooType,
  description: "Delete an item of Foo",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve: (root, args) => {
    return FooModel.findById(args.id).deleteOne().exec();
  }
};