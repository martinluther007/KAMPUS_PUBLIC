const express = require('express');
let router = express.Router()
const fixtureController = require('./../controllers/fixtureController');
const authController = require('./../controllers/authController');

router.route('/')
.get(fixtureController.getFixtures)
.post(authController.protect,authController.restrict('hifl_admin'),fixtureController.createFixtures)

router.route('/:id')
.get(fixtureController.getFixture)
.patch(authController.protect,authController.restrict('hifl_admin'),fixtureController.updateFixtures)
.delete(authController.protect,authController.restrict('hifl_admin'),fixtureController.deleteFixtures)

module.exports = router;