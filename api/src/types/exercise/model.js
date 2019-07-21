const mongoose = require("mongoose");

module.exports = mongoose.model("exercise", {
  name: String,
  description: String,
  type: {
    type: String,
    enum : ['weight+reps','distance+time'],
    default: 'weight+reps'
  }
});