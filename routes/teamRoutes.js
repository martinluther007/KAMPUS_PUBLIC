const express = require('express');
let router = express.Router()
const teamController = require('./../controllers/teamController');
const authController = require('./../controllers/authController');

router.route('/')
.get(teamController.getTeams)
.post(authController.protect,authController.restrict('hifl_admin'),teamController.createTeam)

router.route('/:id')
.get(teamController.getTeam)
.patch(authController.protect,authController.restrict('hifl_admin'),teamController.updateTeam)
.delete(authController.protect,authController.restrict('hifl_admin'),teamController.deleteTeam)

module.exports = router;