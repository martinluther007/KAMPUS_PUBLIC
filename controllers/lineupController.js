const catchAsyncErrors = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Lineup = require('./../model/lineupModel');


exports.getLineups = catchAsyncErrors(async(req, res, next) => {
    const lineups = await Lineup.find();
    res.status(200).json({
        status:'success',
        lineups
    })
});


exports.getLineup = catchAsyncErrors(async(req, res, next) => {
    const lineup = await Lineup.findById(req.params.id);
    if(!lineup) next(new appError('this lineup does not exist',404))
    res.status(200).json({
        status:'success',
        lineup
    })
});

exports.createLineup = catchAsyncErrors(async(req, res, next) => {
    const lineup = await Lineup.create(req.body);
    res.status(201).json({
        status:'success',
        lineup
    })
});

exports.updateLineup = catchAsyncErrors(async(req, res, next) => {
    const UpdatedLineup = await Lineup.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!UpdatedLineup) next(new appError('this Group does not exist',404))
    res.status(200).json({
        status:'success',
        UpdatedLineup
    })
});

exports.deleteLineup = catchAsyncErrors(async(req, res, next) => {
    const lineup = await Lineup.findByIdAndDelete(req.params.id);
    if(!lineup) next(new appError('this group does not exist',404))
    res.status(200).json({
        status:'success',
        data:null
    })
});