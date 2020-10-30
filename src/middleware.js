const { StatusCodes } = require('http-status-codes');

const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND);
  next(`Not Found ${req.originalUrl}`);
};

const errorHandler = (error, req, res) => {
  const statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: process.env.NODE_ENV === 'production' ? true : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
