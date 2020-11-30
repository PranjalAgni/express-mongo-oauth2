const { StatusCodes } = require('http-status-codes');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  regenerateAccessToken,
} = require('./utils/index');

const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND);
  next(new Error(`Not Found ${req.originalUrl}`));
};

const errorHandler = (error, _req, res, next) => {
  const statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: process.env.NODE_ENV === 'production' ? true : error.stack,
  });
  next();
};

const trimUserData = (req, _res, next) => {
  const { _id, googleId, email, fullName } = req.user;
  const userData = {
    _id,
    googleId,
    email,
    fullName,
  };
  req.user = userData;
  next();
};

const addJWT = (req, _res, next) => {
  const token = generateAccessToken(req.user);
  req.jwtToken = token;
  next();
};

const addRefreshToken = (req, _res, next) => {
  const token = generateRefreshToken(req.user);
  req.refreshToken = token;
  next();
};

const isAuthenticated = (req, res, next) => {
  try {
    const accessToken = req.cookies.token;

    if (!accessToken) {
      res.status(StatusCodes.UNAUTHORIZED);
      return next(new Error('Token not provided'));
    }

    const userData = verifyToken(accessToken);
    req.user = userData;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      try {
        const [userData, accessToken] = regenerateAccessToken(
          req.cookies.refreshToken,
        );
        res.set('token', accessToken);
        req.user = userData;
        return next();
      } catch (ex) {
        return next(ex);
      }
    }
    return next(err);
  }
  return next();
};

module.exports = {
  notFound,
  errorHandler,
  addJWT,
  isAuthenticated,
  addRefreshToken,
  trimUserData,
};
