const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
