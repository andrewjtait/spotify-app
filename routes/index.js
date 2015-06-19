var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { q: '', artists: [] });
});

router.post('/', function(req, res) {
  var q = req.body.query;

  var opts = {
    url: "https://api.spotify.com/v1/search?q=" + q + "&type=artist",
    json: true
  };

  request.get(opts, function(error, response, body) {
    res.render('index', { q: q, artists: body.artists.items });
  });
});

module.exports = router;
