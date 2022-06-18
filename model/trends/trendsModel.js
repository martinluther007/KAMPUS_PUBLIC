const mongoose = require("mongoose");
const trendsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, "a minimum of 10 characters is required"],
    // maxlength:[50,'a maximum of 50 characters is required']
  },
  post: {
    type: String,
    required: true,
    minlength: [50, "a minimum of 50 characters is required"],
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "health",
      "technology",
      "entertainment",
      "sports",
      "education",
      "news",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
  },
});

// trendsSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "postedBy",
//   });
//   next();
// });

const Trends = mongoose.model("trends", trendsSchema);
module.exports = Trends;
