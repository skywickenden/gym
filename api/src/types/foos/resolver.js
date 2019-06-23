const FooModel = require("../foo/model");

module.exports = () => {
  return FooModel.find().exec();
};