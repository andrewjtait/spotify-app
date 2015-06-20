var React = require('react');

/**
 * A component to display an artist.
 *
 * @class Artist
 */
var Artist = React.createClass({
  /**
   * @method render
   */
  render: function() {
    return (
      <a className='artist' target='_blank' href={this.props.url}>
        <div className='image'
             style={{backgroundImage: this.constructImageUrl()}}>
        </div>

        <span className='title'>
          {this.props.name}
        </span>
      </a>
    );
  },

  /**
   * @method constructImageUrl
   * @return {String} the url required for the artist's image
   */
  constructImageUrl: function() {
    var url = this.props.image ? 'url(' + this.props.image + ')' : 'none';
    return url;
  }
});

module.exports = Artist;
