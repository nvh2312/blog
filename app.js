const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
// const commentRouter = require("./routes/commentRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();
//set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
// app.use(cors());

// app.options("*", cors());
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );
// Serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

// // Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
// app.use("/api/v1/comments", commentRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
