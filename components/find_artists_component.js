var React = require('react');
var $ = require('jquery');
var SearchForm = require('./search_form.js');
var SearchResults = require('./search_results.js');

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
    if (query == null || query == "") { return; } // return early if no query is entered

    var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist';

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        this.setState({ results: data.artists.items });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
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
