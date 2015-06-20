var React = require('react');

/**
 * A component to handle a search form
 *
 * @class SearchForm
 */
var SearchForm = React.createClass({
  /**
   * Catches the submission of the form and delegates it to the parent.
   *
   * @method handleSubmit
   * @param {Event} ev
   */
  handleSubmit: function(ev) {
    ev.preventDefault();

    var query = React.findDOMNode(this.refs.query).value;
    this.props.onSearchSubmit(query);
  },

  /**
   * @method render
   */
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className='textbox'
          ref='query'
          placeholder='Search Spotify'
          autoFocus />
      </form>
    );
  }
});

module.exports = SearchForm;
