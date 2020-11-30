const { Router } = require('express');
const logger = require('../../logger');

const router = Router();

router.use((_req, _res, next) => {
  logger.info('This is for cookie routes');
  next();
});

router.get('/', (_req, res) => {
  res.cookie('sid', Date.now(), {
    maxAge: 50000,
    httpOnly: true,
    sameSite: 'strict',
  });
  res.send('Cookie added');
});

router.get('/sid', (req, res) => {
  const userCookie = req.cookies.sid;
  if (!userCookie) {
    return res.json({
      message: 'No cookie found get a cookie',
    });
  }

  return res.json({
    message: 'Cookie found',
    data: userCookie,
  });
});

module.exports = router;
