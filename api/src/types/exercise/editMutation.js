const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Edit an an exercise item",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    type: { type: GraphQLString }
  },
  resolve: async (root, args) => {
    return await model.findByIdAndUpdate(
      args.id, 
      args,
      { new: true, runValidators: true }
    ).exec();  
  }
};