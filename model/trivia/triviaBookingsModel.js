const mongoose = require("mongoose");
const Trivia = require("./triviaModel");
const User = require("./../userModel");

const triviaBookingsSchema = new mongoose.Schema({
  trivia: {
    type: mongoose.Schema.ObjectId,
    ref: Trivia,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  transactionRef: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

triviaBookingsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "trivia",
  }).populate({
    path: "user",
  });
  next();
});

triviaBookingsSchema.pre("save", function (next) {
  this.ref = "" + Math.floor(Math.random() * 1000000000 + 1);
  next();
});

const TriviaBookings = mongoose.model("triviaBookings", triviaBookingsSchema);

module.exports = TriviaBookings;
