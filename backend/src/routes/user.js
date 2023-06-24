const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByIdAndBoardId,
  getUsersByBoardId,
} = require("../controllers/user.js");

var userRouter = express.Router();

userRouter.post("/user/", createUser);
userRouter.get("/user/", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:id/board/:boardId", getUserByIdAndBoardId);
userRouter.get("/user/board/:boardId", getUsersByBoardId);
module.exports = userRouter;
