var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

/* GET movies to discover from TMDB API. */
router.get('/movies', function (req, res, next) {
  fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=${TMDB_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      res.json({movies: data.results});
    })
    .catch(err => console.error('error:' + err));
});

/* GET a movie details from TMDB API. */
router.get('/movie/:movieId', function (req, res) {
  const { movieId } = req.params;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const movieInfo = {
        movieId: data.id,
        title: data.title,
        overview: data.overview,
        poster: data.poster_path,
        release: data.release_date,
        runtime: data.runtime,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      };

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const mainCast = [];
        const mainCrew = [];

        for (let i = 0; i < 3; i++) {
          mainCast.push(data.cast[i])
        }
        
        for (const obj of data.crew) {
          if (obj.department === "Directing" && obj.job === "Director") {
            mainCrew.push(obj);
          }
        }

        movieInfo.cast = mainCast;
        movieInfo.crew = mainCrew;

        res.json({movieInfo});
      })

    })
    .catch(err => console.error('error:' + err));
});

module.exports = router;
