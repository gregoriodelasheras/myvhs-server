/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware function
app.use(morgan('common'));

// BONUS: in-memory array of objects
const movies = [
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    director: 'Irvin Kershner',
    releaseDate: 1980,
    runtime: '2h 4min',
    genre: ['Action', 'Adventure', 'Fantasy'],
    mainCast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
    extraData: {
      writers: ['Star Wars Writer 1', 'Star Wars Writer 1'],
      producers: ['Star Wars Producer 1'],
      musicDirection: 'Star Wars Music Director',
      artDirection: 'Star Wars Art Director',
      movieRating: 5,
    },
  },
  {
    title: 'The Shining',
    director: 'Stanley Kubrick',
    releaseDate: 1980,
    runtime: '2h 26min',
    genre: ['Drama', 'Horror'],
    mainCast: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'],
  },
  {
    title: 'Back to the Future',
    director: 'Robert Zemeckis',
    releaseDate: 1985,
    runtime: '1h 56min',
    genre: ['Adventure', 'Comedy', 'Sci-Fi'],
    mainCast: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
  },
  {
    title: 'Blade Runner',
    director: 'Ridley Scott',
    releaseDate: 1982,
    runtime: '1h 57min',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    mainCast: ['Harrison Ford', 'Rutger Hauer', 'Sean Young'],
  },
  {
    title: 'Raiders of the Lost Ark',
    director: 'Steven Spielberg',
    releaseDate: 1981,
    runtime: '1h 55min',
    genre: ['Action', 'Adventure'],
    mainCast: ['Harrison Ford', 'Karen Allen', 'Paul Freeman'],
  },
  {
    title: 'Raging Bull',
    director: 'Martin Scorsese',
    releaseDate: 1980,
    runtime: '2h 9min',
    genre: ['Biography', 'Drama', 'Sport'],
    mainCast: ['Robert De Niro', 'Cathy Moriarty', 'Joe Pesci'],
  },
  {
    title: 'Aliens',
    director: 'James Cameron',
    releaseDate: 1986,
    runtime: '2h 17min',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    mainCast: ['Sigourney Weaver', 'Michael Biehn', 'Carrie Henn'],
  },
  {
    title: 'Amadeus',
    director: 'Milos Forman',
    releaseDate: 1984,
    runtime: '2h 40min',
    genre: ['Biography', 'Drama', 'History'],
    mainCast: ['F. Murray Abraham', 'Tom Hulce', 'Elizabeth Berridge'],
    extraData: {
      writers: ['Amadeus Writer 1', 'Amadeus Writer 1'],
      producers: ['Amadeus Producer 1'],
      musicDirection: 'Amadeus Music Director',
      artDirection: 'Amadeus Art Director',
      movieRating: 4,
    },
  },
  {
    title: 'Once Upon a Time in America',
    director: 'Sergio Leone',
    releaseDate: 1984,
    runtime: '3h 49min',
    genre: ['Crime', 'Drama'],
    mainCast: ['Robert De Niro', 'James Woods', 'Elizabeth McGovern'],
  },
  {
    title: 'Die Hard',
    director: 'John McTiernan',
    releaseDate: 1988,
    runtime: '2h 12min',
    genre: ['Action', 'Thriller'],
    mainCast: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
  },
];

const moviesGenre = [
  {
    name: 'Action',
    movies: [
      'Star Wars: Episode V - The Empire Strikes Back',
      'Blade Runner',
      'Raiders of the Lost Ark',
      'Aliens',
      'Die Hard',
    ],
  },
  {
    name: 'Drama',
    movies: [
      'The Shining',
      'Raging Bull',
      'Amadeus',
      'Once Upon a Time in America',
    ],
  },
  {
    name: 'Sci-Fi',
    movies: ['Back to the Future', 'Blade Runner', 'Aliens'],
  },
  {
    name: 'Adventure',
    movies: [
      'Star Wars: Episode V - The Empire Strikes Back',
      'Back to the Future',
      'Raiders of the Lost Ark',
      'Aliens',
    ],
  },
  {
    name: 'Comedy',
    movies: ['Back to the Future'],
  },
];

const directors = [
  {
    name: 'Irvin Kershner',
    birthYear: 1923,
    deathYear: 2010,
    bio:
      'He gained notice early in his career as a filmmaker for directing quirky, independent drama films, while working as an influential lecturer at the University of Southern California. Later in his career, he transitioned to high-budget blockbusters such as The Empire Strikes Back, the James Bond adaptation Never Say Never Again, and RoboCop 2. Through the course of his career, he received numerous accolades, and was nominated for both a Primetime Emmy Award and a Palme dOr.',
    works: [
      'Stakeout on Dope Street',
      'The Young Captives',
      'Hoodlum Priest',
      'Face in the Rain',
      'The Luck of Ginger Coffey',
      'The Empire Strikes Back',
      'Never Say Never Again',
      'RoboCop 2',
    ],
  },
];

const actors = [
  {
    name: 'Michael J. Fox',
    birthYear: 1961,
    deathYear: null,
    bio:
      'Michael J. Fox was born Michael Andrew Fox on June 9, 1961 in Edmonton, Alberta, Canada, to Phyllis Fox (née Piper), a payroll clerk, and William Fox. His parents moved their 10-year-old son, his three sisters, Kelli Fox, Karen, and Jacki, and his brother Steven, to Vancouver, British Columbia, after his father, a sergeant in the Canadian Army Signal Corps, retired. During these years Michael developed his desire to act.',
    works: [
      'Midnight Madness',
      'Back to the Future',
      'Teen Wolf',
      'Back to the Future Part II',
      'Back to the Future Part III',
      'Doc Hollywood',
    ],
  },
];

// BONUS - Endpoint 1: Return a list of all movies to the user.
app.get('/movies', (req, res) => {
  res.json(movies);
});

// BONUS: Endpoint 2: Return data about a single movie by title to the user.
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => movie.title === req.params.title));
});

// Endpoint 3: Allow users to see which actors star in which movies.
app.get('/movies/:title/maincast', (req, res) => {
  const titleFilm = movies.find((movie) => movie.title === req.params.title);
  res.json(titleFilm.mainCast);
  res.send(
    'Endpoint 3: Successful GET request returning data of which actors star in the queried movie.',
  );
});

// Endpoint 4: Allow users to view more information about different movies
app.get('/movies/:title/extradata', (req, res) => {
  const titleFilm = movies.find((movie) => movie.title === req.params.title);
  res.json(titleFilm.extraData);
});

// Endpoint 5: Return data about a genre by name.
app.get('/genre/:name', (req, res) => {
  res.json(moviesGenre.find((genre) => genre.name === req.params.name));
});

// Endpoint 6: Return data about a director by name.
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) => director.name === req.params.name));
});

// Endpoint 7: Allow users to view information about different actors.
app.get('/actors/:name', (req, res) => {
  res.json(actors.find((actor) => actor.name === req.params.name));
});

// Endpoint 8: Allow new users to register.
app.post('/users', (req, res) => {
  res.send(
    'Endpoint 8: Successful POST request creating a new user in the database',
  );
});

// Endpoint 9: Allow users to update their user info through its ID.
app.put('/users/:id', (req, res) => {
  res.send(
    'Endpoint 9: Successful PUT request updating the user info in the database',
  );
});

// Endpoint 10: Allow existing users to deregister.
app.delete('/users/:id', (req, res) => {
  res.send(
    'Endpoint 10: Successful DELETE request deleting the user from the database',
  );
});

// Endpoint 11: Allow users to add a movie to their list of favorites.
app.post('/users/:id/favmovies', (req, res) => {
  res.send(
    'Endpoint 11: Successful POST request adding a movie to the "Favorite Movies" list.',
  );
});

// Endpoint 12: Allow users to remove a movie from their list of favorites.
app.delete('/users/:id/favmovies', (req, res) => {
  res.send(
    'Endpoint 12: Successful DELETE request deleting the movie from the "Favorite Movies" list.',
  );
});

// Endpoint 13: Allow users to create a "To Watch" list in addition to their "Favorite Movies" list.
app.post('/users/:id/towatch', (req, res) => {
  res.send(
    'Endpoint 13: Successful POST request adding a movie to the "To Watch" list.',
  );
});

// Serving static files
app.use(express.static('public'));

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong. Please try again later.');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
