const express = require('express');

const router = express.Router();

const auth = require('./routes/auth');
const users = require('./routes/users');

router.use('/users', users);
router.use('/auth', auth);

module.exports = router;
