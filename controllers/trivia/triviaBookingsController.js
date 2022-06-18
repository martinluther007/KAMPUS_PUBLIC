const catchAsyncErrors = require("./../../utils/catchAsync");
const appError = require("./../../utils/appError");
const TriviaBookings = require("./../../model/trivia/triviaBookingsModel");

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const triviaBookings = await TriviaBookings.find();
  res.status(200).json({
    status: "success",
    triviaBookings,
  });
});

exports.getBooking = catchAsyncErrors(async (req, res, next) => {
  const triviaBookings = await TriviaBookings.findById(req.params.id);
  if (!triviaBookings)
    next(new appError("this triviaBookings does not exist", 404));
  res.status(200).json({
    status: "success",
    TriviaBookings,
  });
});

exports.getMyBookings = catchAsyncErrors(async (req, res, next) => {
  req.params.id = req.user.id;
  const triviaBookings = await triviaBookings.findById(req.params.id);
  if (!bookings) next(new appError("this bookings does not exist", 404));
  res.status(200).json({
    status: "success",
    bookings,
  });
});

exports.createBookings = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const userId = req.user.id;
  const triviaId = TriviaBookings.findById(req.body.id);
  const amount = req.body.amount;

  const bookings = await Bookings.create({
    user: userId,
    trivia: triviaId,
    status: req.body.status,
    amount,
  });
  res.status(201).json({
    status: "success",
    bookings,
  });
});
