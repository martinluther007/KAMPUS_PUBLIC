const catchAsyncErrors = require("./../../utils/catchAsync");
const appError = require("./../../utils/appError");
const Bookings = require("./../../model/business/bookingsModel");
const Product = require("./../../model/business/productModel");

//middleware to check the payment status from the front
exports.check = (req, res, next) => {
  console.log(req.body);

  console.log("were in ");
  // res.status(200).json({
  //     status:"success"
  // })

  next();
};

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Bookings.find();
  res.status(200).json({
    status: "success",
    bookings,
  });
});

exports.getBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Bookings.findById(req.params.id);
  if (!bookings) next(new appError("this bookings does not exist", 404));
  res.status(200).json({
    status: "success",
    bookings,
  });
});

exports.getMyBookings = catchAsyncErrors(async (req, res, next) => {
  req.params.id = req.user.id;
  const bookings = await Bookings.findById(req.params.id);
  if (!bookings) next(new appError("this bookings does not exist", 404));
  res.status(200).json({
    status: "success",
    bookings,
  });
});

exports.createBookings = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const userId = req.user.id;
  const productId = Product.findById(req.body.id);
  const amount = req.body.amount;

  const bookings = await Bookings.create({
    user: userId,
    product: productId,
    status: req.body.status,
    amount,
  });
  res.status(201).json({
    status: "success",
    bookings,
  });
});
