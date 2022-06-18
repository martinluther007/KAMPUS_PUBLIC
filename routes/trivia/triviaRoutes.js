const express = require('express');
const triviaController = require('./../../controllers/trivia/triviaController');
const authController = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get( authController.protect,triviaController.getAllTrivia)
  .post(authController.protect,authController.restrict('admin'),triviaController.createTrivia);
 

router
  .route('/:id')
  .get(authController.protect,triviaController.getTrivia)
  .patch(authController.protect,authController.restrict('admin'),triviaController.updateTrivia)
  .delete(authController.protect,authController.restrict('admin'),triviaController.deleteTrivia)  

module.exports = router;
