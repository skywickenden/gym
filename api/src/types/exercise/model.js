const mongoose = require("mongoose");

module.exports = mongoose.model("exercise", {
  name: String,
  description: String
});