const cors = require("cors");
const { PORT = 3001 } = process.env;
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const app = express();
const mongoose = require("mongoose");
const mainRoute = require("./routes/index");
const STATUS = require("./utils/errors");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
// body parsers must be registered before routes so handlers can access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoute);

// 404 — resource not found
app.use((req, res) => {
  res
    .status(STATUS.NOT_FOUND)
    .json({ message: "Requested resource not found" });
});

// connect to DB then start the server
mongoose
  .connect("mongodb://127.0.0.1:27017/baequest-db")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to connect to MongoDB", err);
  });
