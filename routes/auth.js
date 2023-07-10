const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  registration,
  login,
  getUserByToken,
} = require('../controllers');

router.get('/signup', (req, res) => res.render('registration'));
router.post('/signup', registration);
router.get('/signin', (req, res) => res.render('login'));
router.post('/signin', login);
router.get(
  '/who-am-i',
  passport.authenticate('jwt', { session: false }),
  getUserByToken,
);

module.exports = router;
