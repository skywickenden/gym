const {
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Delete a workout",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve: (root, args) => {
    return model.findById(args.id).deleteOne().exec();
  }
};