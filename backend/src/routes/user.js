const express = require("express");
const { createUser, getAllUsers, getUserById } = require("../controllers/user.js");

var userRouter = express.Router();

userRouter.post("/user/", createUser);
userRouter.get("/user/", getAllUsers);
userRouter.get("/user/:id", getUserById);

module.exports = userRouter;
