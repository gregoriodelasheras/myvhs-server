const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/** @constant
 * @name movieSchema
 * @description Movies Mongoose Schema
 */
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'genres' }],
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'directors' },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'actors' }],
  releaseYear: { type: Number, required: true },
  runTime: { type: String, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
});

/** @constant
 * @name genreSchema
 * @description Genres Mongoose Schema
 */
const genreSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

/** @constant
 * @name directorSchema
 * @description Directors Mongoose Schema
 */
const directorSchema = mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  birthYear: { type: Number, required: true },
  deathYear: Number,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
});

/** @constant
 * @name actorSchema
 * @description Actors Mongoose Schema
 */
const actorSchema = mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  birthYear: { type: Number, required: true },
  deathYear: Number,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
});

/** @constant
 * @name userSchema
 * @description Users Mongoose Schema
 */
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
  toWatchMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
});

/** @function
 * @name hashUserPassword
 * @description Generate hash for the password (auto-gen a salt of 10 and hash)
 * @param {string} password
 * @param {number} - Hashing salt
 */
userSchema.statics.hashPassword = (password) => bcrypt.hashSync(password, 10);

/** @function
 * @name validateUserPassword
 * @description Compare stored hashed password with password entered on client side
 * @param {string} password
 * @returns {string } password, this.password - Return comparison of received passwords
 */
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const movie = mongoose.model('movie', movieSchema);
const genre = mongoose.model('genre', genreSchema);
const director = mongoose.model('director', directorSchema);
const actor = mongoose.model('actor', actorSchema);
const user = mongoose.model('user', userSchema);

module.exports.movie = movie;
module.exports.genre = genre;
module.exports.director = director;
module.exports.actor = actor;
module.exports.user = user;
