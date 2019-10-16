const model = require("./model");

module.exports = async (root, args) => {
  // const workout = await model.findById(args.id).populate({
  //   path: "exercises.exercise",
  //   model: "exercise"
  // }).exec();
  const workout = await model.findById(args.id).exec();
  return workout;
};