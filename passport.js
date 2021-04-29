const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const models = require('./models.js');

const users = models.user;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (usernamePassport, passwordPassport, callback) => {
      users.findOne(
        { username: usernamePassport },
        (err, user) => {
          if (err) {
            console.error(err);
            return callback(err);
          }
          if (!user) {
            return callback(null, false, { message: 'Oops! Incorrect username. Please try again.' });
          }
          if (!user.validatePassword(passwordPassport)) {
            return callback(null, false, { message: 'Oops! Incorrect password. Please try again.' });
          }
          return callback(null, user);
        },
      );
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, callback) => users
      .findById(jwtPayload._id)
      .then((user) => callback(null, user))
      .catch((err) => callback(err)),
  ),
);
