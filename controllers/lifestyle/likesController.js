const catchAsyncErrors = require('./../../utils/catchAsync');
const appError = require('./../../utils/appError');

const Likes = require('../../model/lifestyle/likesModel');


// exports.getLikes = catchAsyncErrors(async(req, res, next) => {
//     const lifestyle = await Lifestyle.find();
//     res.status(200).json({
//         status:'success',
//         lifestyle
//     })
// });

exports.getLike = catchAsyncErrors(async(req, res, next) => {
    const like = await Like.findById(req.params.id);
    if(!like) return next(new appError('this like does not exist',404))
    res.status(200).json({
        status:'success',
        like
    })
});

exports.createLike = catchAsyncErrors(async(req, res, next) => {
    const like = await Like.create({
        
    });
    res.status(201).json({
        status:'success',
        lifestyle
    })
});