const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    boardName: {
      type: String,
      required: [true, "Board name required"],
    },
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("board", boardSchema);
