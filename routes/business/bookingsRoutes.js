const express = require("express");
const authController = require("./../../controllers/authController");
const bookingsController = require("./../../controllers/business/bookingsController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrict("admin"),
    bookingsController.getAllBookings
  )
  .post(
    authController.protect,
    bookingsController.check,
    bookingsController.createBookings
  );

router
  .route("/:id")
  .get(authController.protect, bookingsController.getMyBookings);
//   .delete(
//     authController.protect,
//     authController.restrict("admin"),
//     triviaController.deleteTrivia
//   );

module.exports = router;
