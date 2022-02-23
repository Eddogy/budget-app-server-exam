const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err?.stack,
  });
};

// Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req?.originalUrl}`);
  res.status(404);
  next(error);
  // this next will return to errorHandler.
  // Creating custom error message and passing it to the next middleware.
}

module.exports = { errorHandler, notFound };
