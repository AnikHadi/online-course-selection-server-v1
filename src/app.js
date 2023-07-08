const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/Course-Selection")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    message: "Learning Portal Server is running!🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
