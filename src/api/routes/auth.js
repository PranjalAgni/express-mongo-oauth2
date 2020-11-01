/* eslint-disable comma-dangle */
const passport = require('passport');
const { Router } = require('express');

const logger = require('../../logger');
const { generateJWT } = require('../../middleware');

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  generateJWT,
  (req, res) => {
    logger.info(req.jwtToken);
    res.set('token', req.jwtToken);
    res.send('ok');
  },
);

module.exports = router;
