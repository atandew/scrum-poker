const Board = require("../models/Board");

exports.createBoard = (req, res) => {
  const { boardName, description, users } = req.body;

  const board = new Board({
    boardName, description, users
  });

  board.save((error, board) => {
    if (error) return res.status(400).json({ error: error });
    if (board) {
      return res.status(201).json({ id :board._id });
    }
  });
};

exports.getAllBoards= (req, res) => {
    Board.find((err, boards) => {
      if (err) return res.status(400).send(err);
      else return res.status(200).send(boards);
    });
  };

exports.getBoardByBoardId = (req, res) => {
   Board.find({_id: req.params.boardId},(err, board)=>{
    if(err) return res.status(400).send(err);
    else return res.status(400).send(board);
   })
};
