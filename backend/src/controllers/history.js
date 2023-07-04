const History = require("../models/History");
const { AddHistory } = require("../services/History");
exports.addHistory = async (req, res) => {
  const { boardId, userId, action, actionType } = req.body;

  const history = {
    boardId,
    userId,
    action,
    actionType,
  };

  console.log("add History =>", history);
  try {
    var historyRes = await AddHistory(history);
  } catch (ex) {
    console.log("ex =>", ex.errors);
    return res.status(400).send(ex.errors);
  }
  return res.status(201).send(historyRes);
};

exports.getHistory = (req, res) => {
  History.find({ boardId: req.params.boardId }, (err, histories) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(histories);
  });
};
