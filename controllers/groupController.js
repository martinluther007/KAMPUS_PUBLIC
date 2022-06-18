const catchAsyncErrors = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Group = require('./../model/groupModel');


exports.getGroups = catchAsyncErrors(async(req, res, next) => {
    const groups = await Group.find();
    res.status(200).json({
        status:'success',
        groups
    })
});

exports.getGroup = catchAsyncErrors(async(req, res, next) => {
    const group = await Group.findById(req.params.id);
    if(!group) next(new appError('this group does not exist',404))
    res.status(200).json({
        status:'success',
        group
    })
});

exports.createGroup = catchAsyncErrors(async(req, res, next) => {
    const group = await Group.create(req.body);
    res.status(201).json({
        status:'success',
        group
    })
});

exports.updateGroup = catchAsyncErrors(async(req, res, next) => {
    const UpdatedGroup = await Group.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!UpdatedGroup) next(new appError('this Group does not exist',404))
    res.status(200).json({
        status:'success',
        UpdatedGroup
    })
});

exports.deleteGroup = catchAsyncErrors(async(req, res, next) => {
    const group = await Group.findByIdAndDelete(req.params.id);
    if(!group) next(new appError('this group does not exist',404))
    res.status(200).json({
        status:'success',
        data:null
    })
});