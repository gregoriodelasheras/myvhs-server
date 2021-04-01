/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const app = express();

// Invoke Morgan middleware function
app.use(morgan('common'));

// Data Top Ten movies of the 80's
const topTenMovies = [
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    director: 'Irvin Kershner',
    releaseDate: 1980,
    runtime: '2h 4min',
    genre: ['Action', 'Adventure', 'Fantasy'],
    mainCast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
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

// GET requests
app.get('/', (req, res) => {
  res.send(
    'Hello and welcome to myVHS! Make yourself comfy, grab your favorite snacks and get ready for a exciting trip straight back to the mind-blowing decade of the 80s!',
  );
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
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
