const express = require("express");
const {
  createBoard,
  getBoardByBoardId,
  getAllBoards,
  updateCreatedByInBoard,
  isBoardAdminRegistered,
  showBoardPoints,
} = require("../controllers/board.js");

var boardRouter = express.Router();

boardRouter.post("/board/", createBoard);
boardRouter.get("/board/", getAllBoards);
boardRouter.get("/board/:boardId", getBoardByBoardId);
boardRouter.put("/board/created-by/:boardId", updateCreatedByInBoard);
boardRouter.get(
  "/board/:boardId/isBoardAdminRegistered/",
  isBoardAdminRegistered
);
boardRouter.patch("/board/:boardId/show-point/:showPoints",showBoardPoints);

module.exports = boardRouter;
