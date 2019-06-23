const mongoose = require("mongoose");

module.exports = mongoose.model("foo", {
  foobar: String
});