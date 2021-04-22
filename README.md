<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://gregoriodelasheras.github.io/myVHS/">
    <img src="img/logo-readme.svg" alt="Logo" width="600">
  </a>
  <p align="center">
    Web App for enthusiasts of 80's movies. All in one VHS! Built with its own API and the MERN stack.
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#endpoints-design">Endpoints Design</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
  <img src="https://www.retro-synthwave.com/wp-content/uploads/2016/10/design-00.jpg" alt="80s" width="600">
</p>

### Objective:
- Build a web application that provides users with access to information about different movies, genres, directors and actors of the 1980s. Users are able to register, update their personal information, deregister and create a list of "Favorites" and "To Watch" movies.

### User Stories:
- As a user, I want to be able to receive information on movies, genres, directors and actors of the 1980s so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to have a "Favorites" list and a "To Watch" list, and add and remove movies from them.
- As a user, I want to access a simple web application with a minimalist interface, displaying only essential information.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
- As a user, I want to be able to update my personal data.
- As a user, I want to be able to deregister my profile from the web application database.

### Key Features: 
- Return a list of movies of the 80's to the user.
- Return data about a single movie by title to the user.
- Return data about movie genres to the user.
- Return data about directors and actors to the user.
- Allow new users to register.
- Allow users to update their data by username.
- Allow existing users to deregister by username.
- Allow users to add and remove movies to their "Favorites" list by movie ID.
- Allow users to add and remove movies to their "To Watch" list by movie ID.
- Secure access to the API data: authentication and authorization with HTTP and JSON Web Token.

### Kanban Board:
The development of this application was organized through a Kanban board. You can see the board by [following this link](https://trello.com/b/6PPcluVZ/myvhs-server-side).

## Built With

- [JavaScript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Dependencies

- bcrypt
-	body-parser
-	cors
-	dotenv
-	eslint
-	express
-	express-validator
-	jsonwebtoken
-	mongoose
-	morgan
-	passport
-	passport-jwt
-	passport-local

## Endpoints Design

<table class="table table-hover align-middle">
  <thead>
    <tr class="table-primary">
      <th scope="col">#</th>
      <th scope="col">Business Logic</th>
      <th scope="col">URL</th>
      <th scope="col">HTTP Method</th>
      <th scope="col">Request</th>
      <th scope="col">Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">00</th>
      <td>Display a welcome message to the user</td>
      <td>/</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A text message that welcomes the user when entering the main
        page of the application.
        <a href="examples/response00.txt" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">01</th>
      <td>Return a list of all movies to the user.</td>
      <td>/movies</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about all the movies, containing
        title, genre, director, actors, releaseYear, runTime,
        imagePath and description.
        <a href="examples/response01.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">02</th>
      <td>
        Return data about a single movie by title to the user.
      </td>
      <td>/movies/:title</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about a single movie queried,
        containing title, genre, director, actors, releaseYear,
        runTime, imagePath and description.
        <a href="examples/response02.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">03</th>
      <td>
        Return a list of the cast of a movie by title to the user.
      </td>
      <td>/movies/:title/cast</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about a single movie queried,
        containing the list of the actors stars acting in it.
        <a href="examples/response03.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">04</th>
      <td>Return a list of all movie genres to the user.</td>
      <td>/genres</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about all the movie genres,
        containing name and description.
        <a href="examples/response04.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">05</th>
      <td>Return data about a movie genre by name.</td>
      <td>/genres/:name</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about the movie genre queried,
        containing name and description.
        <a href="examples/response05.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">06</th>
      <td>Return a list of all directors to the user.</td>
      <td>/directors</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about all the movie directors,
        containing name, bio, birthYear, deathYear and movies.
        <a href="examples/response06.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">07</th>
      <td>Return data about a director by name.</td>
      <td>/directors/:name</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about the movie director queried,
        containing name, bio, birthYear, deathYear and movies.
        <a href="examples/response07.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">08</th>
      <td>Return a list of all actors to the user.</td>
      <td>/actors</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about all the movie actors,
        containing name, bio, birthYear, deathYear and movies.
        <a href="examples/response08.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">09</th>
      <td>Return data about an actor by name.</td>
      <td>/actors/:name</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about the movie actor queried,
        containing name, bio, birthYear, deathYear and movies.
        <a href="examples/response09.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">10</th>
      <td>
        Allow an Admin to view all registered users in the database.
      </td>
      <td>/users</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about all the users, containing
        name, lastName, birthday, country, email, username, password
        (hashed), favoriteMovies and toWatchMovies.
        <a href="examples/response10.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">11</th>
      <td>
        Allow an Admin to view a registered user in the database by
        username.
      </td>
      <td>/users/:username</td>
      <td>GET</td>
      <td>None</td>
      <td>
        A JSON object holding data about the user queried,
        containing name, lastName, birthday, country, email,
        username, password (hashed), favoriteMovies and
        toWatchMovies.
        <a href="examples/response11.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">12</th>
      <td>Allow new users to register.</td>
      <td>/users</td>
      <td>POST</td>
      <td>
        A JSON object holding data about the user to add, containing
        name, lastName, birthday, country, email, username, password
        (hashed), favoriteMovies and toWatchMovies.
        <a href="examples/response12.json" target="_blank">
          View example
        </a>
      </td>
      <td>
        A JSON object holding data about the user that was added,
        containing name, lastName, birthday, country, email,
        username, password (hashed), favoriteMovies and
        toWatchMovies.
        <a href="examples/response12.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">13</th>
      <td>Allow users to update their data by username.</td>
      <td>/users/:username</td>
      <td>PUT</td>
      <td>
        A JSON object holding data about the user to update,
        containing name, lastName, birthday, country, email,
        username, password (hashed), favoriteMovies and
        toWatchMovies.
        <a href="examples/response13.json" target="_blank">
          View example
        </a>
      </td>
      <td>
        A JSON object holding data about the user that was updated,
        containing name, lastName, birthday, country, email,
        username, password (hashed), favoriteMovies and
        toWatchMovies.
        <a href="examples/response13.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">14</th>
      <td>Allow existing users to deregister by username.</td>
      <td>/users/:username</td>
      <td>DELETE</td>
      <td>None</td>
      <td>
        A text message indicating the username of the user that was
        removed from the database, or a text message indicating that
        the username was not found in the database.
        <a href="examples/response14.txt" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">15</th>
      <td>
        Allow users to add a movie to their "Favorites" list by
        movie ID.
      </td>
      <td>/users/:username/favorites/:movie_id</td>
      <td>POST</td>
      <td>
        A JSON object holding data about the movie to be added,
        containing the _id of the movie.
        <a href="examples/response15.json" target="_blank">
          View example
        </a>
      </td>
      <td>
        A JSON object containing data about the updated user's
        "Favorites" list, containing the current IDs of the movies
        from the list.
        <a href="examples/response15.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">16</th>
      <td>
        Allow users to remove a movie from their "Favorites" list by
        movie ID.
      </td>
      <td>/users/:username/favorites/:movie_id</td>
      <td>DELETE</td>
      <td>None</td>
      <td>
        A JSON object containing data about the updated user's
        "Favorites" list, containing the current IDs of the movies
        from the list.
        <a href="examples/response16.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">17</th>
      <td>
        Allow users to add a movie to their "To Watch" list by movie
        ID.
      </td>
      <td>/users/:username/towatch/:movie_id</td>
      <td>POST</td>
      <td>
        A JSON object holding data about the movie to be added,
        containing the _id of the movie.
        <a href="examples/response17.json" target="_blank">
          View example
        </a>
      </td>
      <td>
        A JSON object containing data about the updated user's "To
        Watch" list, containing the current IDs of the movies from
        the list.
        <a href="examples/response17.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">18</th>
      <td>
        Allow users to remove a movie from their "To Watch" list by
        movie ID.
      </td>
      <td>/users/:username/towatch/:movie_id</td>
      <td>DELETE</td>
      <td>None</td>
      <td>
        A JSON object containing data about the updated user's "To
        Watch" list, containing the current IDs of the movies from
        the list.
        <a href="examples/response18.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
    <tr>
      <th scope="row">19</th>
      <td>
        Allows a user to login to the application with their
        username and password (hashed), and automatically generates
        a JWT for the user.
      </td>
      <td>/login</td>
      <td>POST</td>
      <td>None</td>
      <td>
        A JSON object holding data about the user logged into the
        application, containing name, lastName, birthday, country,
        email, username, password (hashed), favoriteMovies and
        toWatchMovies.
        <a href="examples/response19.json" target="_blank">
          View example
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Documentation
To read the API documentation, please follow [this link](https://gregoriodelasheras.github.io/myVHS/public/documentation).

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Francisco Gregorio de las Heras - [@herasdev](https://twitter.com/herasdev)

Project Link: [https://myvhs.herokuapp.com/](https://myvhs.herokuapp.com/)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Itua Akhator](https://github.com/iakhator)
* [Vinh-Tuong Mai](https://github.com/mvtuong)
