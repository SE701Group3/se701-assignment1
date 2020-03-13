require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5001;

// Set up database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const postsRouter = require("./src/routes/posts");
app.use("/posts", postsRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
