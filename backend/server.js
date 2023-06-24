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
app.use("/api", userRouter);
app.use("/api", boardRouter);

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
app.listen(port, () => {
  console.log(`Express Server Listening on localhost: ${port}`);
});
