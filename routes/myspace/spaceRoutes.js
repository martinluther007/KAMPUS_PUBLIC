const express = require("express");
let router = express.Router();
const postController = require("./../../controllers/myspace/spaceController");
const authController = require("./../../controllers/authController");

router
  .route("/")
  .get(authController.protect, postController.getposts)
  .post(
    authController.protect,
    postController.uploadPhoto,
    postController.createPost
  );

router
  .route("/:id")
  .get(authController.protect, postController.getPost)
  .patch(
    authController.protect,
    postController.uploadPhoto,
    postController.updatePost
  )
  .delete(authController.protect, postController.deletePost);

module.exports = router;
