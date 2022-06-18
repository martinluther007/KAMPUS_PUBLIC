const catchAsyncErrors = require("./../../utils/catchAsync");
const appError = require("./../../utils/appError");

const Myspace = require("../../model/myspace/spaceModel");

// for uploading images
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/myspace");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, cb);
  } else {
    cb(new appError("not an image please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

exports.getposts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Myspace.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Myspace.findById(req.params.id);
  if (!post) return next(new appError("this post does not exist", 404));
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  req.body.photo = req.file.filename;
  req.body.postedBy = req.user._id;
  const post = await Myspace.create(req.body);
  res.status(201).json({
    status: "success",
    post,
  });
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  if (req.file);
  req.body.photo = req.file.filename;
  const UpdatedPost = await Myspace.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) return next(new appError("this post does not exist", 404));
  res.status(200).json({
    status: "success",
    UpdatedPost,
  });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Lifestyle.findByIdAndDelete(req.params.id);
  if (!post) return next(new appError("this post does not exist", 404));
  res.status(200).json({
    status: "success",
    data: null,
  });
});
