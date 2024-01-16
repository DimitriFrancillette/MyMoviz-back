var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

/* GET movies to discover from TMDB API. */
router.get('/movies', function (req, res) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&region=FR`)
    .then(response => response.json())
    .then(data => {
      res.json({ movies: data.results });
    })
    .catch(err => console.error('error:' + err));
});

/* GET a movie details from TMDB API. */
router.get('/movie/:movieId', function (req, res) {
  const { movieId } = req.params;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR&append_to_response=credits`)
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

      const mainCast = [];
      const mainCrew = [];

      for (let i = 0; i < 10; i++) {
        mainCast.push(data.credits.cast[i])
      }

      for (const obj of data.credits.crew) {
        if (obj.department === "Directing" && obj.job === "Director") {
          mainCrew.push(obj);
        }
      }

      movieInfo.cast = mainCast;
      movieInfo.crew = mainCrew;

      res.json(movieInfo)

    })
    .catch(err => console.error('error:' + err));
});

/* GET movies by name from TMDB API. */
router.get('/search/:name', function (req, res) {
  const { name } = req.params;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${name}&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => console.error('error:' + err));
});

module.exports = router;
