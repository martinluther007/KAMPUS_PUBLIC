const catchAsyncErrors = require("./../../utils/catchAsync");
const appError = require("./../../utils/appError");

const Lifestyle = require("../../model/lifestyle/lifestyleModel");

// for uploading images
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/lifestyle");
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

exports.getLifestyles = catchAsyncErrors(async (req, res, next) => {
  const lifestyle = await Lifestyle.find();
  res.status(200).json({
    status: "success",
    lifestyle,
  });
});

exports.getLifestyle = catchAsyncErrors(async (req, res, next) => {
  const lifestyle = await Lifestyle.findById(req.params.id);
  if (!lifestyle)
    return next(new appError("this lifestyle does not exist", 404));
  res.status(200).json({
    status: "success",
    lifestyle,
  });
});

exports.createLifestyle = catchAsyncErrors(async (req, res, next) => {
  req.body.photo = req.file.filename;
  const lifestyle = await Lifestyle.create(req.body);
  res.status(201).json({
    status: "success",
    lifestyle,
  });
});

exports.updateLifestyle = catchAsyncErrors(async (req, res, next) => {
  if (req.file);
  req.body.photo = req.file.filename;
  const UpdatedLifestyle = await Lifestyle.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!UpdatedLifestyle)
    return next(new appError("this lifestyle does not exist", 404));
  res.status(200).json({
    status: "success",
    UpdatedLifestyle,
  });
});

exports.deleteLifestyle = catchAsyncErrors(async (req, res, next) => {
  const lifestyle = await Lifestyle.findByIdAndDelete(req.params.id);
  if (!lifestyle)
    return next(new appError("this lifestyle does not exist", 404));
  res.status(200).json({
    status: "success",
    data: null,
  });
});
