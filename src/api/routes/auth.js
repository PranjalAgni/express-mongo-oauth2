/* eslint-disable comma-dangle */
const passport = require('passport');
const { Router } = require('express');

const { addJWT, addRefreshToken, trimUserData } = require('../../middleware');

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
  [trimUserData, addJWT, addRefreshToken],
  (req, res) => {
    res.cookie('token', req.jwtToken, {
      maxAge: 600000,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.cookie('refreshToken', req.refreshToken, {
      maxAge: 600000,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.set('token', req.jwtToken);
    res.set('refreshToken', req.refreshToken);
    res.send('ok');
  },
);

module.exports = router;
