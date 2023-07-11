const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  getUserByToken,
} = require('../controllers');

router.get(
  '/who-am-i',
  passport.authenticate('jwt', { session: false }),
  getUserByToken,
);

module.exports = router;
