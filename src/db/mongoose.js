const mongoose = require('mongoose');
const logger = require('../logger');
const config = require('../config/index');

const connectDB = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

mongoose.connection.on('error', (err) => {
  logger.error(err.stack);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Lost connection from database');
  logger.info('Retrying...');
  connectDB();
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to DB');
});

mongoose.connection.on('reconnected', () => {
  logger.info('Reconnected to DB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Force closing MongoDB connection');
    process.exit(0);
  });
});

module.exports = {
  connectDB,
};
