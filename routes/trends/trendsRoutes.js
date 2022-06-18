const express = require("express");
let router = express.Router();
const trendsController = require("./../../controllers/Trends/trendsController");
const authController = require("./../../controllers/authController");

router
  .route("/")
  .get(trendsController.getTrends)
  .post(
    authController.protect,
    authController.restrict("trends_admin"),
    trendsController.uploadTrendsPhoto,
    trendsController.createTrends
  );

router
  .route("/:id")
  .get(trendsController.getTrend)
  .patch(
    authController.protect,
    authController.restrict("trends_admin"),
    trendsController.uploadTrendsPhoto,
    trendsController.updateTrends
  )
  .delete(
    authController.protect,
    authController.restrict("trends_admin"),
    trendsController.deleteTrends
  );

module.exports = router;
