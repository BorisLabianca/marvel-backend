const mongoose = require("mongoose");
const User = mongoose.model("User", {
  avatar: Object,
  username: String,
  email: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
