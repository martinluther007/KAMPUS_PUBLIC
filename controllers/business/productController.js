const Product = require("./../../model/business/productModel");
const ApiFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

// for uploading images
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/products");
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

exports.uploadProductPhoto = upload.single("photo");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const products = await features;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    summary: req.body.summary,
    description: req.body.description,
    imageCover: req.body.imageCover,
    user: req.user.id,
    photo: req.file.filename,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getMyProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findOne({ user: req.user.id });
  if (!products)
    return next(new AppError("you have not created a product yet", 404));
  res.status(200).json({
    status: "success",
    length: products.length,
    products,
  });
});

exports.getMyProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    user: req.user.id,
    _id: req.params.id,
  });
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.file);
  req.body.photo = req.file.filename;

  const product = await Product.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndDelete({
    user: req.user.id,
    _id: req.params.id,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
