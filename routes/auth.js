const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  registration,
  login,
  getUserByToken,
} = require('../controllers');

router.get('/sign-up', (_, res) => res.render('registration'));
router.post('/sign-up', registration);

router.get('/sign-in', (_, res) => res.render('login'));
router.post('/sign-in', login);

router.get(
  '/who-am-i',
  passport.authenticate('jwt', { session: false }),
  getUserByToken,
);

module.exports = router;
