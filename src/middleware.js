const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const config = require('./config');

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

const generateJWT = (req, res, next) => {
  const opts = {
    expiresIn: config.jwt.expiresIN,
    issuer: 'oauth2:service',
    audience: 'oauth2:client',
    subject: req.user.googleId,
  };

  const token = jwt.sign(req.user, config.jwt.secretKey, opts);
  req.jwtToken = token;
  next();
};

const verifyJWT = (req, res, next) => {
  jwt.verify(req.get('token'), config.jwt.secretKey, (err, user) => {
    if (err) return next(err);
    req.user = user;
    return next();
  });
};

module.exports = {
  notFound,
  errorHandler,
  generateJWT,
  verifyJWT,
};
