const mongoose = require("mongoose");
const express = require("express");
const Cors = require("cors");
const dotenv = require("dotenv");
//App config
//mongodb password for amzon-clone user = jW4cHbvnlwYXbiks
const app = express();
dotenv.config();
const port = process.env.PORT || 8001;
const password = process.env.PASSWORD;
const db = process.env.DB;
const connection_URL = `mongodb+srv://admin:${password}@cluster0.lnf6t.mongodb.net/${db}?retryWrites=true&w=majority`;

//middlewares
app.use(express.json());
app.use(Cors());

//routing
// const productRouter = require("./src/routes/product.js");
const userRouter = require("./src/routes/user.js");
// const categoryRouter = require("./src/routes/category.js");
// const cartRouter = require("./src/routes/cart.js");
// const orderRouter = require("./src/routes/order.js");
// app.use("/api", productRouter);
app.use("/api", userRouter);
// app.use("/api/", categoryRouter);
// app.use("/api/", cartRouter);
// app.use("/api/", orderRouter);
//Db config
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((err) => {
    console.log("MONGODB not connected due to =>", err);
  });

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("srum-poker express server is working fine.");
});

// app.post("/amazon/", (req, res) => {
//   const dbCard = req.body;
//   //   Cards.create(dbCard, (err, data) => {
//   //     if (err) {
//   //       res.status(500).send(err);
//   //     } else {
//   //       res.status(201).send(data);
//   //     }
//   //   });
// });

// app.get("/tinder/cards", (req, res) => {
//   //   Cards.find((err, data) => {
//   //     if (err) {
//   //       res.status(500).send(err);
//   //     } else {
//   //       res.status(200).send(data);
//   //     }
//   //   });
// });
//Listener
app.listen(port, () => {
  console.log(`Express Server Listening on localhost: ${port}`);
});
