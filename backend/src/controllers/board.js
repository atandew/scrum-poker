const Board = require("../models/Board");

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
    (error, board) => {
      if (error) return res.status(400).json({ error: error });
      if (board) {
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
      else return res.status(200).send(false);
    }
  });
};

exports.showBoardPoints = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.boardId },
    { showPoints: req.params.showPoints },
    (err, _res) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(req.params.showPoints);
    }
  );
};
