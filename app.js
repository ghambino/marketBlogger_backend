const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bloglistRouter = require("../bloglistBackend/controllers/bloglistRouter");
const userRouter = require("../bloglistBackend/controllers/userRouter");
const loginRouter = require("../bloglistBackend/controllers/loginRouter");
const middleware = require("../bloglistBackend/utils/middleware");
const cors = require("cors");
const config = require("../bloglistBackend/utils/config");
const logger = require("../bloglistBackend/utils/logger");

const url = config.MONGODB_URI;

logger.info("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MONGODB");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", bloglistRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.requestlogger);
app.use(middleware.errorHandler);

module.exports = app;
