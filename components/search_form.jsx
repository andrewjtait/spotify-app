var React = require('react');

/**
 * A component to handle a search form
 *
 * @class SearchForm
 */
var SearchForm = React.createClass({
  /**
   * Catches the submission of the form and delegates the search.
   *
   * @method handleSubmit
   * @param {Event} ev
   */
  handleSubmit: function(ev) {
    ev.preventDefault();

    // ensure there is no timer waiting to trigger a search
    clearTimeout(this.timer);
    this.delegateSearch();
  },

  /**
   * Trigger on a keyup event to perform the a delayed auto-search.
   *
   * @method handleChange
   */
  handleChange: function() {
    // clear any existing timer
    clearTimeout(this.timer);

    // start a new timer before performing the search
    this.timer = setTimeout(function() {
      this.delegateSearch();
    }.bind(this), 500);
  },

  /**
   * Delegates the search to the parent component.
   *
   * @method delegateSearch
   */
  delegateSearch: function() {
    var query = React.findDOMNode(this.refs.query).value;
    this.props.onSearchSubmit(query);
  },

  /**
   * Store the timer so it can be accessed across the component.
   *
   * @property [Timer]
   */
  timer: null,

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
          onChange={this.handleChange}
          autoFocus />
      </form>
    );
  }
});

module.exports = SearchForm;
