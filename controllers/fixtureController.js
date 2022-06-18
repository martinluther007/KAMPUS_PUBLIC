const catchAsyncErrors = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Fixtures = require('./../model/fixturesModel');



exports.getFixtures = catchAsyncErrors(async(req, res, next) => {
    const fixtures = await Fixtures.find();
    res.status(200).json({
        status:'success',
        fixtures
    })
});

exports.getFixture = catchAsyncErrors(async(req, res, next) => {
    const fixtures = await Fixtures.findById(req.params.id);
    if(!fixtures) next(new appError('this fixture does not exist',404))
    res.status(200).json({
        status:'success',
        fixtures
    })
});

exports.createFixtures = catchAsyncErrors(async(req, res, next) => {
    const fixtures = await Fixtures.create(req.body);
    res.status(201).json({
        status:'success',
        fixtures
    })
});

exports.updateFixtures = catchAsyncErrors(async(req, res, next) => {
    const UpdatedFixtures = await Fixtures.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!UpdatedFixtures) next(new appError('this fixture does not exist',404))
    res.status(200).json({
        status:'success',
        UpdatedFixtures
    })
});

exports.deleteFixtures = catchAsyncErrors(async(req, res, next) => {
    const fixtures = await Fixtures.findByIdAndDelete(req.params.id);
    if(!fixtures) next(new appError('this fixture does not exist',404))
    res.status(200).json({
        status:'success',
        data:null
    })
});