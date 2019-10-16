const {
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const type = require("./type");
const model = require("./model");

module.exports = {
  type: type,
  description: "Edit an a workout item",
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    datetime: { type: GraphQLNonNull(GraphQLDateTime) },
  },
  resolve: async (root, args) => {
    return await model.findByIdAndUpdate(
      args.id, 
      args,
      { new: true, runValidators: true }
    ).exec();  
  }
};