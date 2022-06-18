const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const appError = require("./utils/appError");

const playerRouter = require("./routes/playerRoutes");
const userRouter = require("./routes/userRoutes");
const fixtureRouter = require("./routes/fixtureRoutes");
const groupRouter = require("./routes/groupRoutes");
const lineupRouter = require("./routes/lineupRoutes");
const teamRouter = require("./routes/teamRoutes");
const productRouter = require("./routes/business/productRoutes");
const bookingsRouter = require("./routes/business/bookingsRoutes");
const trendsRouter = require("./routes/trends/trendsRoutes");
const triviaRouter = require("./routes/trivia/triviaRoutes");
const triviaWinnersRouter = require("./routes/trivia/triviaWinnerRoutes");
const lifestyleRouter = require("./routes/lifestyle/lifestyleRoutes");
const TriviaBookingsRouter = require("./routes/trivia/triviaBookingsRoutes");
const spaceRouter = require("./routes/myspace/spaceRoutes");

const app = express();

app.use(cors());
// Accept JSON formats here
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`hello world`);
});

// GENERAL ROUTE FOR ALL USERS
app.use(`/users`, userRouter);

// HIFL ROUTES
app.use(`/players`, playerRouter);
app.use(`/fixtures`, fixtureRouter);
app.use(`/groups`, groupRouter);
app.use(`/lineups`, lineupRouter);
app.use(`/teams`, teamRouter);

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

// mySpace

app.use("/myspace", spaceRouter);

app.all(`*`, (req, res, next) => {
  next(new appError(`oops the route ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

// connecting to our local database
mongoose
  .connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connected successfully");
  });

const PORT = process.env.PORT || 3300;
const server = app.listen(`${PORT}`, () => {
  console.log(`app is running on PORT: ${PORT}`);
});
