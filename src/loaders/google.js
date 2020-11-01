/* eslint-disable comma-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const UserService = require('../services/user');
const config = require('../config/index');

const initalizePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.redirectURL,
      },
      (accessToken, refreshToken, profile, done) => {
        const userService = new UserService();
        userService
          .signupUser(profile, accessToken)
          .then((user) => {
            done(null, user);
          })
          .catch((err) => done(err));
      },
    ),
  );
};

module.exports = {
  initalizePassport,
};
