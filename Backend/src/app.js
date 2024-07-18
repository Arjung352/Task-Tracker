const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userApi = require("./Router/User");
const taskApi = require("./Router/Task");
app.use(cors());
app.use(express.json());
app.use("/api", userApi);
app.use("/api", taskApi);
app.get("/", (req, res) => {
  res.json("Hey its a backend");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the database");
    app.listen(1000, () => {
      console.log("server listning at port 1000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
