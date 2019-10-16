const workoutModel = require("../workout/model");

module.exports = () => {
  return workoutModel.find().sort({"datetime": "desc"}).exec();
};