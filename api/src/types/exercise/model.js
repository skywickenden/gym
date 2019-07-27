const mongoose = require("mongoose");

module.exports = mongoose.model("exercise", {
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum : ["weight+reps","distance+time"],
    default: "weight+reps"
  }
});