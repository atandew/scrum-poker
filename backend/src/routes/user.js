const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByIdAndBoardId,
  getUsersByBoardId,
  setBoardPoint,
  clearAllUsersPoint,
  deleteUserById,
} = require("../controllers/user.js");

var userRouter = express.Router();

userRouter.post("/user/", createUser);
userRouter.get("/user/", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:id/board/:boardId", getUserByIdAndBoardId);
userRouter.get("/user/board/:boardId", getUsersByBoardId);
userRouter.patch("/user/:userId/board/:boardId", setBoardPoint);
userRouter.patch(
  "/user/:userId/board/:boardId/clear-points",
  clearAllUsersPoint
);
userRouter.delete("/user/:userId", deleteUserById);
module.exports = userRouter;
