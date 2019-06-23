const FooModel = require("./model");

module.exports = (root, args, context, info) => {
  return FooModel.findById(args.id).exec();
};