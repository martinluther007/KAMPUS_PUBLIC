const { Mixed } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please put in your first name"],
    },
    lastName: {
      type: String,
      required: [true, "please put in your last name"],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["hifl_admin", "user", "trends_admin", "admin"],
      default: "user",
    },
    userName: {
      type: Mixed,
      required: [true, "please put in a username"],
      unique: [
        true,
        "the {VALUE} has already been chosen please out in a new one",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      validate: validator.isEmail,
      required: [true, "please put in your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: Mixed,
      required: [true, "please put in your password"],
      min: [8, "please put in a minimum of 8 characters"],
    },
    accountBalance: {
      type: String,
      default: 50,
    },
    passwordConfirm: {
      type: Mixed,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
      message: `${this.password} and ${this.passwordConfirm} are not the same`,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

//hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  //only  run the next code if password is modified
  if (!this.isModified("password")) return next();
  //hash the password
  this.password = await bcrypt.hash(this.password, 12);
  //delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  //only  run the next code if password is modified
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1500;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
// check if input passwords match with the one in the database

userSchema.methods.checkPassword = async function (
  inputPassword,
  storedPassword
) {
  return await bcrypt.compare(inputPassword, storedPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changed = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changed;
  }
  // false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return token;
};

userSchema.pre("save", function (next) {
  this.key = crypto.randomBytes(32).toString("ascii");
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
