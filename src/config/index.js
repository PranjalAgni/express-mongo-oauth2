const dotenv = require('dotenv');
const isDocker = require('is-docker');

const config = dotenv.config();

if (config.error) {
  throw new Error('Could not find .env file');
}

process.env.NODE_ENV = 'development' || process.env.NODE_ENV;

const isRunningInsideDocker = isDocker();

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  isDocker: isRunningInsideDocker,
  port: parseInt(process.env.PORT, 10),
  databaseURL: isRunningInsideDocker
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL_LOCAL,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURL: process.env.GOOGLE_CALLBACK_URL,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIN: '1m',
  },
  refreshToken: {
    expiresIN: '7d',
  },
};
