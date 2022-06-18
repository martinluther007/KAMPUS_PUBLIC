const express = require('express');
var router = express.Router();
const playerController = require('./../controllers/playerController');
const authController = require('./../controllers/authController');
router.route(`/`)
.get(playerController.getPlayers)
.post(authController.protect,authController.restrict('hifl_admin'),playerController.uploadPlayerPhoto,playerController.createPlayer)

router.route(`/:id`)
    .get(playerController.getPlayer)
    .patch(authController.protect,authController.restrict('hifl_admin'),playerController.uploadPlayerPhoto,playerController.updatePlayer)
    .delete(authController.protect,authController.restrict('hifl_admin'),playerController.deletePlayer)

module.exports = router