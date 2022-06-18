const Player = require('../model/playerModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('./../utils/catchAsync');
const appError = require('./../utils/appError');



const multer = require('multer');;


const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/image/players');
    },
    filename:(req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
    }
});

const multerFilter = (req, file,cb) => {
  if(file.mimetype.startsWith('image')){
      cb(null,cb)
  }else {
      cb(new appError('not an image please upload only images',400),false)
  }
}

const upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

exports.uploadPlayerPhoto = upload.single('photo')


exports.getPlayers = catchAsyncErrors(async(req, res, next) => {
    // execute the query;
    const features = new ApiFeatures(Player.find(),req.query).filter().sort().limit().paginate();
        
    const players = await features;
    console.log(players);

    // sending response
    res.status(200).json({
        status:'success',
        numberOfPlayers:players.length,
        data:{
            players
        }
    })
    // next()
})

exports.getPlayer = catchAsyncErrors(async (req, res,next) => {
    const player = await Player.findById(req.params.id);
    if(!player) return next(new appError(`that player does not exist`,404))
        res.status(200).json({
            status:'success',
            data:{
                player
            }
        })
})

exports.createPlayer = catchAsyncErrors(async (req,res) => {
    if(req.file) req.body.photo = req.file;
    const newPlayer = await Player.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                player:newPlayer
            }
        });  
}) 

exports.updatePlayer = catchAsyncErrors(async (req,res) => {
    if(req.file) req.body.photo = req.file;
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!updatedPlayer) return next(new appError(`that player does not exist`,404))
    res.status(200).json({
        status:'success',
        player:updatedPlayer
    })
})

exports.deletePlayer = catchAsyncErrors(async (req,res) => {
    await Player.findByIdAndDelete(req.params.id)
    // if(!player) return next(new appError(`that player does not exist`,404))
        res.status(204).json({
            status:'success',
            data:{
                player:null
            }
    })
})


