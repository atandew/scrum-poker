const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema(
  {
    boardName: {
      type: String,
      required: [true, "Board name required"],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    showPoints: {
      type: Boolean,
      default: false,
    },
    showHistory: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("board", boardSchema);
