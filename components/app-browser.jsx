// This file will be vendored to the DOM.

var React = require('react');
var App = require('./app-server.jsx');

React.render(
  <App />,
  document.getElementById('app')
);
