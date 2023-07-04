const Board = require("../models/Board");

exports.getBoardById = (boardId) => {
  return Board.findById(boardId);
};
