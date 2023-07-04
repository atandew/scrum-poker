const History = require("../models/History");

exports.AddHistory = (history) => {
  console.log("history on service =>", history);
  const _history = new History({ ...history });
  return _history.save();
};
