var React = require('react');
var FindArtistsComponent = require('./find_artists_component.js');

/**
 * The constructor for the app.
 *
 * @class App
 */
var App = React.createClass({
  /**
   * @method render
   */
  render: function() {
    return <FindArtistsComponent />
  }
});

// export for the server:
module.exports = App;
