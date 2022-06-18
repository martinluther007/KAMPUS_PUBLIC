const mongoose = require("mongoose");
const User = require("./../userModel");
const Product = require("./productModel");
const bookingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  transactionRef: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: Product,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name _id",
  }).populate({
    path: "product",
    select: "name price",
  });
  next();
});

bookingsSchema.pre("save", function (next) {
  this.ref = "" + Math.floor(Math.random() * 1000000000 + 1);
  next();
});

const Bookings = mongoose.model("bookings", bookingsSchema);

module.exports = Bookings;
