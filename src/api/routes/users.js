const { Router } = require('express');
const logger = require('../../logger');
const { isAuthenticated } = require('../../middleware');

const router = Router();

router.use((_req, _res, next) => {
  logger.info('Only called for users routes');
  next();
});

router.post('/', isAuthenticated, (req, res) => {
  logger.info(JSON.stringify(req.user));
  res.json({
    status: 200,
    user: req.user,
  });
});

module.exports = router;
