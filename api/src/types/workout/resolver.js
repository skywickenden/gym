const model = require("./model");

module.exports = async (root, args) => {
  const workout = await model.findById(args.id).populate({
    path: "exercises.exercise",
    model: "exercise"
  }).exec();
  return workout;
};