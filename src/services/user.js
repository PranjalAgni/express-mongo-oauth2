/* eslint-disable class-methods-use-this */
const logger = require('../logger');
const Users = require('../models/Users');

class UserService {
  async signupUser({ id, displayName, emails }, token) {
    let user = null;
    const newUser = Users();
    try {
      user = await this.checkUserExists(id);

      if (!user) {
        newUser.googleId = id;
        newUser.token = token;
        newUser.email = emails[0].value;
        newUser.fullName = displayName;
        await newUser.save();
      }
    } catch (ex) {
      logger.error(ex.stack);
    }

    const currentUser = user || newUser;
    return currentUser.toJSON();
  }

  async checkUserExists(profileId) {
    let user = null;
    try {
      user = await Users.findOne({ googleId: profileId });
    } catch (ex) {
      logger.error(ex.stack);
    }
    return user;
  }
}

module.exports = UserService;
