require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const postsRouter = require("./src/routes/posts");
app.use("/posts", postsRouter);

app.get("/", (req, res) => res.send("Hello World!"));

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

module.exports = app;
