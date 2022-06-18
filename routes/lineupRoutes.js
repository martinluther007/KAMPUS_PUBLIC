const express = require('express');
let router = express.Router()
const lineupController = require('./../controllers/lineupController');
const authController = require('./../controllers/authController');

router.route('/')
.get(lineupController.getLineups)
.post(authController.protect,authController.restrict('hifl_admin'),lineupController.createLineup)

router.route('/:id')
.get(lineupController.getLineup)
.patch(authController.protect,authController.restrict('hifl_admin'),lineupController.updateLineup)
.delete(authController.protect,authController.restrict('hifl_admin'),lineupController.deleteLineup)

module.exports = router;