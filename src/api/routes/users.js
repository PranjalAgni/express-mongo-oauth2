const express = require('express');
const logger = require('../../logger');

const router = express.Router();

router.post('/', (req, res) => {
  logger.info(JSON.stringify(req.body));
  res.json({
    status: 200,
    message: 'Ok',
  });
});

module.exports = router;
