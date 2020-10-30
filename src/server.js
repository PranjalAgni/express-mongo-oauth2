const express = require('express');
const config = require('./config/index');
const logger = require('./logger');
const loadApp = require('./app.js');

const startServer = async () => {
  const app = express();
  await loadApp(app);
  app.listen(config.port, () => {
    logger.info(
      `Server running on http://localhost:${config.port} in ${process.env.NODE_ENV} mode`,
    );
  });
};

startServer();
