const appError = require("./../utils/appError");
const User = require("./../model/userModel");
const catchAsync = require("././../utils/catchAsync");
// for uploading images
const multer = require("multer");
// for processing images
const sharp = require("sharp");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// multer configuration for image uploads

// const multerStorage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'public/image/users');
//     },
//     filename:(req,file,cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// });

const multerStorage = multer.memoryStorage();

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

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/users/${req.file.filename}`);

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new appError(`this route is not for updating passwords`), 400);
  }

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "userName",
    "email",
    "accountBalance"
  );
  if (req.file) filteredBody.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    return res.status(200).json({
      status: "success",
      user,
    });
  }
  return res.status(404);
});
//  ADMIN HANDLER FOR USERS

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password -__v");
  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  /*const user = */ await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "success",
    user,
  });
});
