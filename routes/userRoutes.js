const express = require("express");
var router = express.Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router.post(`/signUp`, authController.signUp);
router.post(`/login`, authController.login);
router.get("/logout", authController.logout);
router.post(`/forgotPassword`, authController.forgotPassword);
router.patch(`/resetPassword/:token`, authController.resetPassword);
router.patch(
  `/updateMyPassword`,
  authController.protect,
  authController.updatePassword
);
router.patch(
  `/updateMe`,
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete(`/deleteMe`, authController.protect, userController.deleteMe);
router.get(`/me`, authController.protect, userController.getMe);

router
  .route(`/`)
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrict("admin"),
    userController.createAdmin
  );

router
  .route(`/:id`)
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getOneUser
  )
  //     .patch(userController.updateUser)
  .delete(
    authController.protect,
    authController.restrict("admin"),
    userController.deleteUser
  );

module.exports = router;
