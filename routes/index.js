var express = require('express');
var router = express.Router();
var JSX = require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var ReactApp = React.createFactory(require('../components/app-server.jsx'));

router.get('/', function(req, res, next) {
  var markup = React.renderToString(ReactApp());
  res.render('index', { markup: markup });
});

module.exports = router;
