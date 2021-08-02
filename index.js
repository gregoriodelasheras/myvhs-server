/* eslint-disable no-console */
const express = require('express');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
require('./passport');
const mongoose = require('mongoose');
const models = require('./models.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));
mongoose.set('useFindAndModify', false);

const movies = models.movie;
const genres = models.genre;
const directors = models.director;
const actors = models.actor;
const users = models.user;

/** @constant
 * @name allowedOrigins
 * @description List of allowed websites (CORS policies)
 */
const allowedOrigins = [
  'http://localhost:8080', // Server-side localhost.
  'http://localhost:1234', // Client-side React localhost.
  'http://localhost:4200', // Client-side Angular localhost.
  'https://myvhs.herokuapp.com', // Server-side website.
  'https://myvhs.netlify.app', // Client-side React website.
  'https://herasdev.com', // Client-side Angular website (GitHub Pages).
];

/** @function
 * @name corsHandler
 * @description Handle website requests
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const message = `The CORS policy for this application doesn't allow access from origin ${origin}`;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  }),
);

/** @function
 * @name databaseConnect
 * @description Create promise to connect to the database
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./auth')(app);

/** @function
 * @name welcomeUser
 * @description Welcome the user to the API
 * @returns {string} - Welcome message to the user
 */
app.get('/', (req, res) => {
  res.send(
    "Hi and welcome to myVHS! Get comfy, grab your favorite snacks and get ready for an exciting trip right back to the mind-blowing decade of the 80's!",
  );
});

/** @function
 * @name getMovies
 * @description Return a list of all movies to the user
 * @returns {json} moviesQueried - All movies from database
 */
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    movies
      .find()
      .then((moviesQueried) => {
        res.status(201).json(moviesQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getMovie
 * @description Return data about a single movie by ID to the user
 * @param {string} id - The movie's ID
 * @returns {json} movieQueried - Single movie from database
 */
app.get(
  '/movies/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    movies
      .findOne({ _id: req.params.id })
      .then((movieQueried) => {
        res.status(201).json(movieQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getMovieCast
 * @description Return a list of the actors of a movie by ID to the user
 * @param {string} id - The movie's ID
 * @returns {json} movieQueried.actors - All actors of single movie from database
 */
app.get(
  '/movies/:id/cast',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    movies
      .findOne({ _id: req.params.id })
      .then((movieQueried) => {
        res.status(201).json(movieQueried.actors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getGenres
 * @description Return a list of all movie genres to the user
 * @returns {json} genresQueried - All movie genres from database
 */
app.get(
  '/genres',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    genres
      .find()
      .then((genresQueried) => {
        res.status(201).json(genresQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getGenre
 * @description Return data about a movie genre by ID
 * @param {string} id - The genre's ID
 * @returns {json} genreQueried - Single movie genre from database
 */
app.get(
  '/genres/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    genres
      .findOne({ _id: req.params.id })
      .then((genreQueried) => {
        res.status(201).json(genreQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getDirectors
 * @description Return a list of all directors to the user
 * @returns {json} directorsQueried - All directors from database
 */
app.get(
  '/directors',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    directors
      .find()
      .then((directorsQueried) => {
        res.status(201).json(directorsQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getDirector
 * @description Return data about a director by ID
 * @param {string} id - The director's ID
 * @returns {json} directorQueried - Single movie director from database
 */
app.get(
  '/directors/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    directors
      .findOne({ _id: req.params.id })
      .then((directorQueried) => {
        res.status(201).json(directorQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getActors
 * @description Return a list of all actors to the user
 * @returns {json} actorsQueried - All actors from database
 */
app.get(
  '/actors',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    actors
      .find()
      .then((actorsQueried) => {
        res.status(201).json(actorsQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getActor
 * @description Return data about an actor by ID
 * @param {string} id - The actor's ID
 * @returns {json} actorQueried - Single movie actor from database
 */
app.get(
  '/actors/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    actors
      .findOne({ _id: req.params.id })
      .then((actorQueried) => {
        res.status(201).json(actorQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getUsers
 * @description Allow an Admin to view all registered users in the database
 * @returns {json} usersQueried - All users from database
 */
app.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .find()
      .then((usersQueried) => {
        res.status(201).json(usersQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name getUser
 * @description View a registered user in the database by username
 * @param {string} username - The user's username
 * @returns {json} userQueried - Single user from database
 */
app.get(
  '/users/:username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOne({ username: req.params.username })
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name registerUser
 * @description Register a new user in the database
 * @param {object} - New user registration data
 * @returns {json} userQueried - Response with the new registered user's data
 */
app.post(
  '/users',
  [
    check('name', 'Apologies, name is required.').not().isEmpty(),
    check('lastName', 'Apologies, last name is required.').not().isEmpty(),
    check(
      'username',
      'Apologies, the username requires a minimum of 6 characters.',
    ).isLength({ min: 6 }),
    check(
      'username',
      'Apologies, the username only allows alphanumeric characters.',
    ).isAlphanumeric(),
    check(
      'email',
      'Apologies, the entered email does not seem to be valid',
    ).isEmail(),
    check(
      'password',
      'Apologies, the password requires a minimum of 8 characters.',
    ).isLength({ min: 8 }),
  ],
  // eslint-disable-next-line consistent-return
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = users.hashPassword(req.body.password);
    users
      .findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .send(
              `Apologies, the username "${req.body.username}" has already been taken.`,
            );
        }
        users
          .create({
            name: req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            country: req.body.country,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
          })
          .then((userQueried) => {
            res.status(201).json(userQueried);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
          });
        return true;
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name updateUser
 * @description Update user's data by username
 * @param {object} - New updated user data
 * @param {string} username - The user's username
 * @returns {json} userQueried - Response with the new updated user data
 */
app.put(
  '/users/:username',
  [
    check('name', 'Apologies, name is required.').not().isEmpty(),
    check('lastName', 'Apologies, last name is required.').not().isEmpty(),
    check(
      'username',
      'Apologies, the username requires a minimum of 6 characters.',
    ).isLength({ min: 6 }),
    check(
      'username',
      'Apologies, the username only allows alphanumeric characters.',
    ).isAlphanumeric(),
    check(
      'email',
      'Apologies, the entered email does not seem to be valid',
    ).isEmail(),
    check(
      'password',
      'Apologies, the password requires a minimum of 8 characters.',
    ).isLength({ min: 8 }),
  ],
  passport.authenticate('jwt', { session: false }),
  // eslint-disable-next-line consistent-return
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = users.hashPassword(req.body.password);
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $set: {
            name: req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            country: req.body.country,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
          },
        },
        { new: true },
      )
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name deleteUser
 * @description Delete a user from the database by username
 * @param {string} username - The user's username
 * @returns {string} - Response with the confirmation of the user's deletion
 */
app.delete(
  '/users/:username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOneAndDelete({ username: req.params.username })
      .then((userQueried) => {
        if (!userQueried) {
          res
            .status(400)
            .send(
              `Apologies, the username "${req.params.username}" was not found in the database.`,
            );
        } else {
          res
            .status(200)
            .send(
              `The user with username "${req.params.username}" has been deleted from the database.`,
            );
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name addFavoriteMovie
 * @description Add a movie to the Favorites list by movie ID
 * @param {string} username - The user's username
 * @param {string} movie_id - The movie's ID
 * @returns {json} userQueried - Response with the confirmation of the added film
 */
app.post(
  '/users/:username/favorites/:movie_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $addToSet: { favoriteMovies: req.params.movie_id },
        },
        { new: true },
      )
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name deleteFavoriteMovie
 * @description Delete a movie from the Favorites list by movie ID
 * @param {string} username - The user's username
 * @param {string} movie_id - The movie's ID
 * @returns {json} userQueried - Response with the confirmation of the deleted film
 */
app.delete(
  '/users/:username/favorites/:movie_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $pull: { favoriteMovies: req.params.movie_id },
        },
        { new: true },
      )
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name addToWatchMovie
 * @description Add a movie to the To-Watch list by movie ID
 * @param {string} username - The user's username
 * @param {string} movie_id - The movie's ID
 * @returns {json} userQueried - Response with the confirmation of the added film
 */
app.post(
  '/users/:username/towatch/:movie_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $addToSet: { toWatchMovies: req.params.movie_id },
        },
        { new: true },
      )
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name deleteToWatchMovie
 * @description Delete a movie from the To-Watch list by movie ID
 * @param {string} username - The user's username
 * @param {string} movie_id - The movie's ID
 * @returns {json} userQueried - Response with the confirmation of the deleted film
 */
app.delete(
  '/users/:username/towatch/:movie_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $pull: { toWatchMovies: req.params.movie_id },
        },
        { new: true },
      )
      .then((userQueried) => {
        res.status(201).json(userQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/** @function
 * @name errorHandler
 * @description Handle errors
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong. Please try again later.');
});

/** @function
 * @name portListener
 * @description Port listener for development environment
 */
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on Port ${port}`);
});
