const express = require('express');
let router = express.Router()
const likesController = require('./../../controllers/lifestyle/likesController');
const authController = require('./../../controllers/authController');

router.route('/')
.get(likesController.getLikes)
.post(authController.protect,likesController.createLike)

router.route('/:id')
.get(likesController.getLike)

module.exports = router;