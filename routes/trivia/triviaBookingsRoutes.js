const express = require("express");
const authController = require("./../../controllers/authController");
const bookingsController = require("./../../controllers/business/bookingsController");
const triviaBookingsController = require("./../../controllers/trivia/triviaBookingsController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrict("admin"),
    triviaBookingsController.getAllBookings
  )
  .post(
    authController.protect,
    bookingsController.check,
    triviaBookingsController.createBookings
  );

router
  .route("/:id")
  .get(authController.protect, triviaBookingsController.getMyBookings);
//   .delete(
//     authController.protect,
//     authController.restrict("admin"),
//     triviaController.deleteTrivia
//   );

module.exports = router;
