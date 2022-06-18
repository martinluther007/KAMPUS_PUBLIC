const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Trivia = require('./../../model/trivia/triviaModel');

exports.getAllTrivia = catchAsync(async (req, res, next) => {  
    const trivia = await Trivia.find();
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: trivia.length,
      data: {
        trivia
      }
    });
  });
  
  exports.getTrivia = catchAsync(async (req, res, next) => {
    const trivia = await Trivia.findById(req.params.id);  
    if (!trivia) {
      return next(new AppError('No trivia found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        trivia
      }
    });
  });
  
  exports.createTrivia = catchAsync(async (req, res, next) => {
    
    const newTrivia = await Trivia.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        trivia: newTrivia
      }
    });
  });
  
  exports.updateTrivia = catchAsync(async (req, res, next) => {
    const trivia = await Trivia.findByIdAndUpdate(req.params.id,req.body);
  
    if (!trivia) {
      return next(new AppError('No trivia found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        trivia
      }
    });
  });
  
  exports.deleteTrivia = catchAsync(async (req, res, next) => {
    const trivia = await Trivia.findByIdAndDelete(req.params.id);
    if (!trivia) {
      return next(new AppError('No trivia found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  