const catchAsyncErrors = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Team = require('./../model/teamModel');

exports.getTeams = catchAsyncErrors(async(req, res, next) => {
    const teams = await Team.find();
    res.status(200).json({
        status:'success',
        length:teams.length,
        teams
    })
})

exports.getTeam = catchAsyncErrors(async(req, res, next) => {
    const team = await Team.findById(req.params.id);
    if(!team) next(new appError('this team does not exist',404))
    res.status(200).json({
        status:'success',
        team
    })
});

exports.createTeam = catchAsyncErrors(async(req, res, next) => {
    const team = await Team.create(req.body);
    res.status(201).json({
        status:'success',
        team
    })
});

exports.updateTeam = catchAsyncErrors(async(req, res, next) => {
    const UpdatedTeam = await Team.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!UpdatedTeam) next(new appError('this Group does not exist',404))
    res.status(200).json({
        status:'success',
        UpdatedTeam
    })
});

exports.deleteTeam = catchAsyncErrors(async(req, res, next) => {
    const team = await Team.findByIdAndDelete(req.params.id);
    if(!team) next(new appError('this group does not exist',404))
    res.status(200).json({
        status:'success',
        data:null
    })
});