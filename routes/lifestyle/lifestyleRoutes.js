const express = require("express");
let router = express.Router();
const lifestyleController = require("./../../controllers/lifestyle/lifestyleController");
const authController = require("./../../controllers/authController");

router
  .route("/")
  .get(lifestyleController.getLifestyles)
  .post(
    authController.protect,
    authController.restrict("admin"),
    lifestyleController.uploadPhoto,
    lifestyleController.createLifestyle
  );

router
  .route("/:id")
  .get(lifestyleController.getLifestyle)
  .patch(
    authController.protect,
    authController.restrict("admin"),
    lifestyleController.uploadPhoto,
    lifestyleController.updateLifestyle
  )
  .delete(
    authController.protect,
    authController.restrict("admin"),
    lifestyleController.deleteLifestyle
  );

module.exports = router;
