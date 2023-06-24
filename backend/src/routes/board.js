const express = require("express");
const {
  createBoard,
  getBoardByBoardId,
  getAllBoards,
  updateCreatedByInBoard,
  isBoardAdminRegistered,
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

module.exports = boardRouter;
