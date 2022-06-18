const express = require('express');
const triviaWinnersController = require('./../../controllers/trivia/triviaWinnerController');
const authController = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(triviaWinnersController.getAllTriviaWinners)
  .post(authController.protect,authController.restrict('admin'),triviaWinnersController.createTriviaWinner);
 

router
  .route('/:id')
  .get(triviaWinnersController.getTriviaWinner)
  .patch(authController.protect,authController.restrict('admin'),triviaWinnersController.updateTriviaWinner)
  .delete(authController.protect,authController.restrict('admin'),triviaWinnersController.deleteTriviaWinner)  

module.exports = router;
