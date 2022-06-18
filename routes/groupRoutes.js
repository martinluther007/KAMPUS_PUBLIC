const express = require('express');
let router = express.Router()
const groupController = require('./../controllers/groupController');
const authController = require('./../controllers/authController');

router.route('/')
.get(groupController.getGroups)
.post(authController.protect,authController.restrict('hifl_admin'),groupController.createGroup)

router.route('/:id')
.get(groupController.getGroup)
.patch(authController.protect,authController.restrict('hifl_admin'),groupController.updateGroup)
.delete(authController.protect,authController.restrict('hifl_admin'),groupController.deleteGroup)

module.exports = router;