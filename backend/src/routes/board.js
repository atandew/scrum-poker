const express = require("express");
const { createBoard, getBoardByBoardId, getAllBoards} = require("../controllers/board.js");

var boardRouter = express.Router();

boardRouter.post("/board/", createBoard);
boardRouter.get("/board/", getAllBoards);
boardRouter.get("/board/:boardId", getBoardByBoardId);

module.exports = boardRouter;
