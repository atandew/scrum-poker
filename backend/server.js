const mongoose = require("mongoose");
const express = require("express");
const Cors = require("cors");
const dotenv = require("dotenv");
//App config
//mongodb password for amazon-clone user = jW4cHbvnlwYXbiks
const app = express();
dotenv.config();
const port = process.env.PORT || 8001;
const password = process.env.PASSWORD;
const db = process.env.DB;
const connection_URL = `mongodb+srv://admin:${password}@cluster0.lnf6t.mongodb.net/${db}?retryWrites=true&w=majority`;

//middleware
app.use(express.json());
app.use(Cors());

//routing
const userRouter = require("./src/routes/user.js");
const boardRouter = require("./src/routes/board.js");
const historyRouter = require("./src/routes/history.js");
app.use("/api", userRouter);
app.use("/api", boardRouter);
app.use("/api", historyRouter);

//Db config
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((err) => {
    console.log("MONGODB not connected due to =>", err);
  });

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("scrum-poker express server is working fine.");
});

//Listener
const server = app.listen(port, () => {
  console.log(`Express Server Listening on localhost: ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL_DEV_NETWORK,
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (boardId) => {
    socket.join(boardId);
    socket.emit("connected");
    socket.in(boardId).emit("refresh-board");
  });

  socket.on("show-points", (boardId) => {
    socket.in(boardId).emit("show-board-points");
  });

  socket.on("hide-points", (boardId) => {
    socket.in(boardId).emit("hide-board-points");
  });

  socket.on("refresh-board", (boardId) => {
    socket.in(boardId).emit("refresh-board");
  });

  app.get("/api/board/:boardId/refresh-board", (req, res) => {
    console.log("refresh-board through api");
    socket.in(req.params.boardId).emit("refresh-board");
    return res.status(200).send(true);
  });

  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // socket.on("new message", (newMessageRecieved) => {
  //   var chat = newMessageRecieved.chat;

  //   if (!chat.users) return //console.log("chat.users not defined");

  //   chat.users.forEach((user) => {
  //     if (user._id == newMessageRecieved.sender._id) return;

  //     socket.in(user._id).emit("message recieved", newMessageRecieved);
  //   });
  // });

  socket.off("setup", () => {
    //console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
