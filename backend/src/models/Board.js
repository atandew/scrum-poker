const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    boardName: {
      type: String,
      required: [true, "Board name required"],
    },
    description: {
      type: String,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("board", boardSchema);
