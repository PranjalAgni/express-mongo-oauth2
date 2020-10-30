const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');

const db = require('./db/mongoose');
const routes = require('./api/index');
const { notFound, errorHandler } = require('./middleware');
const { initalizePassport } = require('./loaders/google');

const initalizeServer = async (app) => {
  // Connect to DB
  await db.connectDB();

  // If we are behind some reverse proxy like Nginx then we can trust this
  app.enable('trust proxy');

  app.use(compression());
  app.use(helmet());
  app.use(morgan('common'));
  app.use(express.json());
  app.use(passport.initialize());

  // Load passport configuration
  initalizePassport();
  app.use('/api/', routes);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initalizeServer;
