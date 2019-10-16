const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("workoutExercise", {
  exercises: [{
    exercise: { type: Schema.Types.ObjectId, ref: "exercise" },
    reps: [{
      weight: Number,
      quantity: Number,
      distance: Number,
      timespan: String
    }],
  }]
});