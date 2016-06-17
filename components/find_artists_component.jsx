var React = require('react');
var SearchForm = require('./search_form.jsx');
var SearchResults = require('./search_results.jsx');

/**
 * A composition of components to create a UI to find artists.
 *
 * @class FindArtistsComponent
 */
var FindArtistsComponent = React.createClass({
  /**
   * Sets the default data set.
   *
   * @method getInitialState
   */
  getInitialState: function() {
    return { results: [] };
  },

  /**
   * Performs an AJAX query to find artists based on the search term.
   *
   * @method findArtists
   * @param {String} query
   */
  findArtists: function(query) {
    if (query == null || query == "") { return false; } // return early if no query is entered

    var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          this.setState({ results: data.artists.items });
        }
      }
    }.bind(this);

    xhr.send();
  },

  /**
   * @method render
   */
  render: function() {
    return (
      <div>
        <SearchForm onSearchSubmit={this.findArtists} />
        <SearchResults results={this.state.results} />
      </div>
    )
  }
});

module.exports = FindArtistsComponent;
