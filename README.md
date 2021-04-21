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

Objective:
- Build a web application that provides users with access to information about different movies, genres, directors and actors of the 1980s. Users are able to register, update their personal information, deregister and create a list of "Favorites" and "To Watch" movies.

User Stories:
- As a user, I want to be able to receive information on movies, genres, directors and actors of the 1980s so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to have a "Favorites" list and a "To Watch" list, and add and remove movies from them.
- As a user, I want to access a simple web application with a minimalist interface, displaying only essential information.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
- As a user, I want to be able to update my personal data.
- As a user, I want to be able to deregister my profile from the web application database.

Key Features: 
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

Documentation
- To read the API documentation, please follow [this link](https://gregoriodelasheras.github.io/myVHS/public/documentation).

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
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
