const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { SECRET_KEY } = process.env;

const { db } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await db.User.findOne({
          where: { id: payload },
          attributes: ['id', 'email'],
        });

        done(null, user || false);
      } catch (error) {
        done(error, null);
      }
    }),
  );
};
