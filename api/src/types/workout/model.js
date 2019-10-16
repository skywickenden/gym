const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("workout", {
  datetime: {
    type: Date,
    required: true
  },
  exercises: [{
    foo: String
    // exercise: { type: Schema.Types.ObjectId, ref: "exercise" },
    // reps: [{
    //   weight: Number,
    //   quantity: Number,
    //   distance: Number,
    //   timespan: String
    // }],
  }]
});