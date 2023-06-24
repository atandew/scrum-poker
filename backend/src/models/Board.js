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
  },
  { timestamps: true }
);

module.exports = mongoose.model("board", boardSchema);
