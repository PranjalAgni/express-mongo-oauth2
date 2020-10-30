const dotenv = require('dotenv');

const config = dotenv.config();

if (config.error) {
  throw new Error('Could not find .env file');
}

process.env.NODE_ENV = 'development' || process.env.NODE_ENV;

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URL,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURL: process.env.GOOGLE_CALLBACK_URL,
  },
};
