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
    boardId: {
      type: String,
      required: [true, "Board Id is required"],
    },
    boardPoint: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
