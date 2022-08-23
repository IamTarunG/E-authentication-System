const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
