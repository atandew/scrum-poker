const Board = require("../models/Board");
const { AddHistory } = require("../services/History");
const History = require("../models/History");
const { ACTION_TYPE } = require("../constants");
const { getUserById } = require("../services/User");

exports.createBoard = (req, res) => {
  const { boardName, description, createdBy } = req.body;

  const board = new Board({
    boardName,
    description,
    createdBy,
  });

  //console.log("create board =>", board);
  board.save((error, board) => {
    if (error) return res.status(400).json({ error: error });
    if (board) {
      return res.status(201).json({ id: board._id });
    }
  });
};

exports.updateCreatedByInBoard = (req, res) => {
  const { createdBy } = req.body;
  //console.log("updateCreatedByInBoard =>", createdBy);
  Board.updateOne(
    { _id: req.params.boardId },
    { createdBy: createdBy },
    async (error, board) => {
      if (error) return res.status(400).json({ error: error });
      if (board) {
        const user = await getUserById(createdBy);
        const history = {
          boardId: req.params.boardId,
          userId: createdBy,
          action: "Board Created by " + user?.userName,
          actionType: ACTION_TYPE.BoardCreated,
        };
        try {
          await AddHistory(history);
        } catch (ex) {
          console.log("ex =>", ex.errors);
          return res.status(400).send(ex.errors);
        }
        return res.status(201).json({ id: board._id });
      }
    }
  );
};

exports.getAllBoards = (req, res) => {
  Board.find((err, boards) => {
    if (err) return res.status(400).send(err);
    else return res.status(200).send(boards);
  });
};

exports.getBoardByBoardId = (req, res) => {
  Board.findById(req.params.boardId, (err, board) => {
    if (err) return res.status(400).send(err);
    else return res.status(200).send(board);
  });
};

exports.isBoardAdminRegistered = (req, res) => {
  Board.findById(req.params.boardId, (err, board) => {
    if (err) return res.status(400).send(err);
    else {
      //console.log("board =>", board);
      //console.log("board.createdBy =>", board.createdBy);
      if (board?.createdBy) return res.status(200).send(true);
      return res.status(200).send(false);
    }
  });
};

exports.showBoardPoints = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.boardId },
    { showPoints: req.params.showPoints },
    async (err, _res) => {
      if (err) return res.status(400).send(err);
      const history = {
        boardId: req.params.boardId,
        userId: req.params.userId,
        action: req.params.showPoints == "true" ? "Show Points" : "Hide Points",
        actionType:
          req.params.showPoints == "true"
            ? ACTION_TYPE.ShowBoardPoints
            : ACTION_TYPE.HideBoardPoints,
      };
      try {
        await AddHistory(history);
      } catch (ex) {
        console.log("ex =>", ex.errors);
        return res.status(400).send(ex.errors);
      }
      return res.status(200).send(req.params.showPoints);
    }
  );
};

exports.showHistory = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.boardId },
    { showHistory: req.params.showHistory },
    async (err, _res) => {
      if (err) return res.status(400).send(err);
      console.log("");
      const history = {
        boardId: req.params.boardId,
        userId: req.params.userId,
        action:
          req.params.showHistory == "true" ? "Show History" : "Hide History",
        actionType:
          req.params.showHistory == "true"
            ? ACTION_TYPE.ShowHistory
            : ACTION_TYPE.HideHistory,
      };
      try {
        await AddHistory(history);
      } catch (ex) {
        console.log("ex =>", ex.errors);
        return res.status(400).send(ex.errors);
      }
      return res.status(200).send(req.params.showHistory);
    }
  );
};
