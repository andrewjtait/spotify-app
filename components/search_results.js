var React = require('react');
var Artist = require('./artist.js');

/**
 * A component to handle the results return from the search.
 *
 * @class SearchResults
 */
var SearchResults = React.createClass({
  /**
   * @method render
   */
  render: function() {
    return (
      <ul className='artist-list'>
        <li>
          {this.buildList()}
        </li>
      </ul>
    );
  },

  /**
   * Builds a list from the search results.
   *
   * @method buildList
   * @return {HTML} the markup for the search results
   */
  buildList: function() {
    var artists = this.props.results.map(function(artist) {
      return (
        <Artist name={artist.name}
                url={artist.external_urls.spotify}
                image={this.getImageUrl(artist.images)} />
      );
    }.bind(this));

    return artists;
  },

  /**
   * Determines if the result has any images and returns the relevant URL.
   *
   * @method getImageUrl
   * @param {Array} images
   * @return {String}
   */
  getImageUrl: function(images) {
    var image = images.length ? images[0].url : null;
    return image;
  }
});

module.exports = SearchResults;
