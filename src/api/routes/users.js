const express = require('express');
const logger = require('../../logger');
const { verifyJWT } = require('../../middleware');

const router = express.Router();

router.post('/', verifyJWT, (req, res) => {
  logger.info(JSON.stringify(req.user));
  res.json({
    status: 200,
    user: req.user,
  });
});

module.exports = router;
