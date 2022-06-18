const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./../userModel");
// const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product must have a name"],
    trim: true,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "A Product must have a price"],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A Product must have a summary"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A Product must have a description"],
  },
  photo: {
    type: String,
    required: [true, "A Product must have a cover image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

productSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
