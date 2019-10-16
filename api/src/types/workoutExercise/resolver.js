const model = require("./model");

module.exports = (root, args) => {
  return model.findById(args.id).exec();
};