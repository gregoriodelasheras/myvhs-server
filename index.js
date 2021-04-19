/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');
const models = require('./models.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('common'));
// eslint-disable-next-line no-unused-vars
const auth = require('./auth')(app);
require('./passport');

const movies = models.movie;
const genres = models.genre;
const directors = models.director;
const actors = models.actor;
const users = models.user;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/myVHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint 01: Return a list of all movies to the user.
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

// Endpoint 02: Return data about a single movie by title to the user.
app.get(
  '/movies/:title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    movies
      .findOne({ title: req.params.title })
      .then((movieQueried) => {
        res.status(201).json(movieQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

// Endpoint 03: Return a list of the cast of a movie by title to the user.
app.get(
  '/movies/:title/cast',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    movies
      .findOne({ title: req.params.title })
      .then((movieQueried) => {
        res.status(201).json(movieQueried.actors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

// Endpoint 04: Return a list of all movie genres to the user.
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

// Endpoint 05: Return data about a movie genre by name.
app.get(
  '/genres/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    genres
      .findOne({ name: req.params.name })
      .then((genreQueried) => {
        res.status(201).json(genreQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

// Endpoint 06: Return a list of all directors to the user.
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

// Endpoint 07: Return data about a director by name.
app.get(
  '/directors/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    directors
      .findOne({ name: req.params.name })
      .then((directorQueried) => {
        res.status(201).json(directorQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

// Endpoint 08: Return a list of all actors to the user.
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

// Endpoint 09: Return data about an actor by name.
app.get(
  '/actors/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    actors
      .findOne({ name: req.params.name })
      .then((actorQueried) => {
        res.status(201).json(actorQueried);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

// Endpoint 10: Allow an Admin to view all registered users in the database.
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

// Endpoint 11: Allow an Admin to view a registered user in the database by username.
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

// Endpoint 12: Allow new users to register.
app.post('/users',
  [
    check('name', 'Apologies, name is required.').not().isEmpty(),
    check('lastName', 'Apologies, last name is required.').not().isEmpty(),
    check('username', 'Apologies, the username requires a minimum of 6 characters.').isLength({ min: 6 }),
    check('username', 'Apologies, the username only allows alphanumeric characters.').isAlphanumeric(),
    check('email', 'Apologies, the entered email does not seem to be valid').isEmail(),
    check('password', 'Apologies, the password requires a minimum of 8 characters.').isLength({ min: 8 }),
    // eslint-disable-next-line consistent-return
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = users.hashPassword(req.body.Password);
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
  });

// Endpoint 13: Allow users to update their data by username.
app.put(
  '/users/:username',
  [
    check('name', 'Apologies, name is required.').not().isEmpty(),
    check('lastName', 'Apologies, last name is required.').not().isEmpty(),
    check('username', 'Apologies, the username requires a minimum of 6 characters.').isLength({ min: 6 }),
    check('username', 'Apologies, the username only allows alphanumeric characters.').isAlphanumeric(),
    check('email', 'Apologies, the entered email does not seem to be valid').isEmail(),
    check('password', 'Apologies, the password requires a minimum of 8 characters.').isLength({ min: 8 }),
  ],
  passport.authenticate('jwt', { session: false }),
  // eslint-disable-next-line consistent-return
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = users.hashPassword(req.body.Password);
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

// Endpoint 14: Allow existing users to deregister by username.
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

// Endpoint 15: Allow users to add a movie to their "Favorites" list by movie ID.
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

// Endpoint 16: Allow users to remove a movie from their "Favorites" list by movie ID.
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

// Endpoint 17: Allow users to add a movie to their "To Watch" list by movie ID.
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

// Endpoint 18: Allow users to remove a movie from their "To Watch" list by movie ID.
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

// Serving static files
app.use(express.static('public'));

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong. Please try again later.');
});

// CORS
const allowedOrigins = ['http://localhost:8080', ''];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const message = `The CORS policy for this application doesn't allow access from origin ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
}));

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
