var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

/* GET movies to discover fromt TMDB API. */
router.get('/movies', function (req, res, next) {
  fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=${TMDB_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.json({movies: data.results});
    })
    .catch(err => console.error('error:' + err));
});

module.exports = router;
