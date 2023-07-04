const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    boardId: {
      type: String,
      required: [true, "Board Id is required"],
    },
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
    action: {
      type: String,
      required: [true, "Action is required"],
    },
    actionType: {
      type: Number,
      required: [true, "Action type is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("history", historySchema);
