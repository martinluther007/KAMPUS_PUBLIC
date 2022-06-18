const catchAsyncErrors = require("./../../utils/catchAsync");
const appError = require("./../../utils/appError");
const Trends = require("./../../model/trends/trendsModel");

// for uploading images
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/trends");
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

exports.uploadTrendsPhoto = upload.single("photo");

exports.getTrends = catchAsyncErrors(async (req, res, next) => {
  const trends = await Trends.find();
  res.status(200).json({
    status: "success",
    trends,
  });
});

exports.getTrend = catchAsyncErrors(async (req, res, next) => {
  const trends = await Trends.findById(req.params.id);
  if (!trends) next(new appError("this trends does not exist", 404));
  res.status(200).json({
    status: "success",
    trends,
  });
});

exports.createTrends = catchAsyncErrors(async (req, res, next) => {
  req.body.photo = req.file.filename;
  req.body.postedBy = req.user;
  const trends = await Trends.create(req.body);
  res.status(201).json({
    status: "success",
    trends,
  });
});

exports.updateTrends = catchAsyncErrors(async (req, res, next) => {
  if (req.file);
  req.body.photo = req.file.filename;
  const UpdatedTrends = await Trends.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!UpdatedTrends) next(new appError("this Trends does not exist", 404));
  res.status(200).json({
    status: "success",
    UpdatedTrends,
  });
});

exports.deleteTrends = catchAsyncErrors(async (req, res, next) => {
  const trends = await Trends.findByIdAndDelete(req.params.id);
  if (!trends) next(new appError("this trends does not exist", 404));
  res.status(200).json({
    status: "success",
    data: null,
  });
});
