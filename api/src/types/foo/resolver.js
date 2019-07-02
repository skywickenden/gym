const FooModel = require("./model");

module.exports = (root, args) => {
  return FooModel.findById(args.id).exec();
};