const express = require("express");
const { addHistory, getHistory } = require("../controllers/history.js");

var historyRouter = express.Router();

historyRouter.post("/history/", addHistory);
historyRouter.get("/history/board/:boardId", getHistory);

module.exports = historyRouter;
