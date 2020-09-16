const express = require("express");
const morgan = require('morgan');
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/users", userRouter);
app.use("/api/blog", blogRoutes)
app.use(globalErrorHandler);

module.exports = app;
