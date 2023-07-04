const express = require("express");
const {
  createBoard,
  getBoardByBoardId,
  getAllBoards,
  updateCreatedByInBoard,
  isBoardAdminRegistered,
  showBoardPoints,
  showHistory,
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
boardRouter.patch(
  "/board/:boardId/user/:userId/show-point/:showPoints",
  showBoardPoints
);
boardRouter.patch(
  "/board/:boardId/user/:userId/show-history/:showHistory",
  showHistory
);

module.exports = boardRouter;
