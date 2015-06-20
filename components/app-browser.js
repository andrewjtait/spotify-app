// This file will be vendored to the DOM.

var React = require('react');
var App = require('./app-server.js');

React.render(
  <App />,
  document.getElementById('app')
);
