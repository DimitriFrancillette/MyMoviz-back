var express = require('express');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
  fetch(``)
  .then(response => response.json())
  .then(data => {console.log(data)})
});

module.exports = router;
