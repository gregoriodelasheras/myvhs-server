/* eslint-disable no-console */
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
        { username: usernamePassport, password: passwordPassport },
        (err, user) => {
          if (err) {
            console.error(err);
            return callback(err);
          }
          if (!user) {
            return callback(null, false, {
              message:
                'Oops! Incorrect username or password. Please try again.',
            });
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
      // ("_id" MongoDB field)
      // eslint-disable-next-line no-underscore-dangle
      .findById(jwtPayload._id)
      .then((user) => callback(null, user))
      .catch((err) => callback(err)),
  ),
);
