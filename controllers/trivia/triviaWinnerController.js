const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TriviaWinner = require('./../../model/trivia/triviawinnersModel');

exports.getAllTriviaWinners = catchAsync(async (req, res, next) => {  
    const triviaWinners = await TriviaWinner.find();
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: triviaWinners.length,
      data: {
        triviaWinners
      }
    });
  });
  
  exports.getTriviaWinner = catchAsync(async (req, res, next) => {
    const triviaWinner = await TriviaWinner.findById(req.params.id);  
    if (!triviaWinner) {
      return next(new AppError('No triviaWinner found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        triviaWinner
      }
    });
  });
  
  exports.createTriviaWinner = catchAsync(async (req, res, next) => {
    const newTriviaWinner = await TriviaWinner.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        triviaWinner: newTriviaWinner
      }
    });
  });
  
  exports.updateTriviaWinner = catchAsync(async (req, res, next) => {
    const triviaWinner = await TriviaWinner.findByIdAndUpdate(req.params.id,req.body);
    if (!triviaWinner) {
      return next(new AppError('No triviaWinner found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        triviaWinner
      }
    });
  });
  
  exports.deleteTriviaWinner = catchAsync(async (req, res, next) => {
    const triviaWinner = await TriviaWinner.findByIdAndDelete(req.params.id);
    if (!triviaWinner) {
      return next(new AppError('No triviaWinner found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  