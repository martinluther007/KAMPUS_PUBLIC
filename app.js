const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
//personal modules
const playerRouter = require("./routes/playerRoutes");
const userRouter = require("./routes/userRoutes");
const playerRecordRouter = require("./routes/playerRecordRoutes");
const fixtureRouter = require("./routes/fixtureRoutes");
const groupRouter = require("./routes/groupRoutes");
const lineupRouter = require("./routes/lineupRoutes");
const teamRouter = require("./routes/teamRoutes");
const teamRecordRouter = require("./routes/teamRecordRoutes");
const productRouter = require("./routes/business/productRoutes");
const bookingsRouter = require("./routes/business/bookingsRoutes");
const trendsRouter = require("./routes/trends/trendsRoutes");
const triviaRouter = require("./routes/trivia/triviaRoutes");
const triviaWinnersRouter = require("./routes/trivia/triviaWinnerRoutes");
const lifestyleRouter = require("./routes/lifestyle/lifestyleRoutes");
const likesRouter = require("./routes/lifestyle/lifestyleRoutes");
const TriviaBookingsRouter = require("./routes/trivia/triviaBookingsRoutes");

// const helmet = require("helmet");

app.use(cors());

// rate limiting options
// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 100,
//   message: "to many requests from this ip please try again in an hour",
// });
// limits request from the same ip
// app.use(limiter);
// middleware that adds request to the body(body parser)
app.use(express.json());

app.use(cookieParser);

// data sanitization against no sql query injection
// app.use(mongoSanitize());

// data sanitization against xss
// app.use(xss());

// parameter pollution
//console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.get(`/`, (req, res) => {
  res.send(`hello world`);
});

// GENERAL ROUTE FOR ALL USERS
app.use(`/users`, userRouter);

// HIFL ROUTES

app.use(`/players`, playerRouter);
app.use(`/playerRecords`, playerRecordRouter);
app.use(`/fixtures`, fixtureRouter);
app.use(`/groups`, groupRouter);
app.use(`/lineups`, lineupRouter);
app.use(`/teams`, teamRouter);
app.use(`/teamRecords`, teamRecordRouter);

// BUSINESS
app.use(`/products`, productRouter);
app.use(`/bookings`, bookingsRouter);

// TRENDS
app.use(`/trends`, trendsRouter);

//trivia
app.use(`/trivia`, triviaRouter);
app.use(`/triviaWinners`, triviaWinnersRouter);
app.use(`/triviaBookings`, TriviaBookingsRouter);

// lifestyle

app.use("/lifestyle", lifestyleRouter);

//likes
console.log("Alex");
app.use("/likes", likesRouter);

//mySpace

// app.use("/myspace", spaceRouter);

// error function for all non existing routes
// app.all(`*`, (req, res, next) => {
//   next(new appError(`oops the route ${req.originalUrl} does not exist`, 404));
// });

// global error handling middleware

module.exports = app;
