/* eslint-disable comma-dangle */
const passport = require('passport');
const { Router } = require('express');

const logger = require('../../logger');

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    logger.info('Logging user object');
    logger.info(req.user);
    res.send('ok');
  }
);

module.exports = router;
