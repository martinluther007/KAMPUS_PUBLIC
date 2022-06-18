const appError = require("../utils/appError");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const Email = require("./../utils/email");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const createToken = (id) => {
  const token = jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

const createAndSendToken = (user, statusCode, res) => {
  const token = createToken({ id: user._id /*, email: user.email*/ });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  // remove password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  // sign user up
  const user = req.body;
  const newUser = await User.create(user);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if theres an email or password in the input
  if (!email || !password) {
    return next(new appError("please put in your email or password", 400));
  }
  //check if the user exists and password is correct

  const user = await User.findOne({ email });
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(
      new appError(
        "invalid email or password please check your inputs and try again",
        401
      )
    );

  // send jwt to the client
  createAndSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
// only for rendered pages and there should be no errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //check if token is valid
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      //check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();
      // check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // there is a logged in user
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.protect = catchAsync(async (req, res, next) => {
  // get token and check if token exists
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if(req.cookies.jwt)  {
  //     token = req.cookies.jwt
  //     console.log(token);
  // }

  if (!token) {
    return next(
      new appError(`you are not logged in. please log in to gain access`, 401)
    );
  }
  //check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new appError(`this user does not exist anymore`, 401));
  // check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new appError(`user recently changed password, please login again`, 401)
    );
  }
  // grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on email and check if he exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new appError(`there is no user with this email`, 404));
  //generate random token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //send it back as an email

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/users/resetPassword/${resetToken}`;
    const message = `forgot password? please click this link to reset your password ${resetUrl}\n if you didn't make this request please ignore`;
    await new Email(user, resetUrl).sendPasswordReset(message);
    res.status(200).json({
      status: "success",
      message: "token sent to mail",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new appError(
        `there was an error sending the email,please try again later`,
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({ passwordResetToken: hashedToken });

  //set password if there is a user and token has not expired
  if (!user)
    return next(
      new appError(`this user does not exist,please restart the process`, 404)
    );

  if (Date.now() > user.passwordResetExpires) {
    return next(
      new appError(
        `your time has expired please run the process again. thank you`
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  //update passwordChangedAt for the user done with an instance method
  await user.save();

  //login the user i.e send a token to the user

  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //check if the user is logged in
  const user = await User.findById(req.user.id);

  //check if password is correct

  if (!(await user.checkPassword(req.body.currentPassword, user.password)))
    return next(
      new appError(
        `the old password does not match, please check your input and try again`,
        401
      )
    );

  //update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //log the user in

  createAndSendToken(user, 200, res);
});
