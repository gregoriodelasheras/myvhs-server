const jwt = require('jsonwebtoken');
const passport = require('passport');

require('dotenv').config();
require('./passport');

const generateJWTToken = (user) => jwt.sign(user, process.env.JWT_SECRET, {
  subject: user.username,
  expiresIn: '7d',
  algorithm: 'HS256',
});

/** @function
 * @returns {json} - Username and user token
 * @description Allow users to log in the website
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Oops! Username or password wrong. Please try again.',
          user,
        });
      }
      req.login(user, { session: false }, () => {
        if (err) {
          res.send(err);
        }
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
