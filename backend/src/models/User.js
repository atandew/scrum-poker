const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
    userName: {
      type: String,
      required: [true, "userName required"],
    },
    gender: {
      type: String,
      required: [true, "Gender required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
