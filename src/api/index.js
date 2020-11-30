const { Router } = require('express');
const auth = require('./routes/auth');
const users = require('./routes/users');
const cookie = require('./routes/cookie');

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/cookie', cookie);

module.exports = router;
