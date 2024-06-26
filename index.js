const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const libRouter = require("./routes/library.route");
const cors = require("cors");
const morgan = require("morgan");
const {
  logFormat,
  accessLogStream,
  middleware,
} = require("./middleware/morgan.middleware");
require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(logFormat, { stream: accessLogStream }));
app.use(middleware);
app.use("/user", userRouter);
app.use("/library", libRouter);

app.get("/", (req, res) => {
  res.send("Health check is fine");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
});
