const exerciseModel = require("../exercise/model");

module.exports = () => {
  return exerciseModel.find().exec();
};