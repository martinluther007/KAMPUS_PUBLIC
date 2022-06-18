const appError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // operational error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //log error
    console.error("ERROR", err);

    // unknown error users should not know about
    res.status(500).json({
      status: "error",
      message: `something went wrong and the admin has been notified `,
    });
  }
};

const handleInvalidIdDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new appError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  if (err.keyValue.userName) {
    const message = `the username ${err.keyValue.userName} already exists please try another name`;
    return new appError(message, 400);
  }
  if (err.keyValue.email) {
    const message = `the email ${err.keyValue.userName} already exists please try another email`;
    return new appError(message, 400);
  }
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data ${errors.join(". ")}`;
  return new appError(message, 400);
};

const handleJWTError = () =>
  new appError(`invalid token,please login again`, 401);
const handleJWTExpired = () =>
  new appError(`token has expired please login again`, 401);

//Global error handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    //invalid database id
    if (error.kind === "ObjectId") error = handleInvalidIdDB(error);
    // if any unique value is set in our schema
    if (error.name === "MongoError" && error.code === 11000) {
      error = handleDuplicateFieldsDb(error);
    }

    if (error._message === "player validation failed")
      error = handleValidationError(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError(error);

    if (error.name === "TokenExpiredError") error = handleJWTExpired(error);
    sendErrorProd(err, res);
  }
  next();
};
