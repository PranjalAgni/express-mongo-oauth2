const pino = require('pino');
const config = require('./config/index');

let loggerConfig = {};

if (config.isDev) {
  loggerConfig = {
    prettyPrint: {
      levelFirst: true,
    },
  };
}

const logger = pino(loggerConfig);

module.exports = logger;
