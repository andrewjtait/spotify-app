jest.dontMock('../../components/find_artists_component.js');

var Component = require('../../components/find_artists_component.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var $ = require('jquery');
var SearchResults = require('../../components/search_results.js');
var SearchForm = require('../../components/search_form.js');

describe('Find Artists Component', function() {
  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(
      <Component />
    );
  });

  it('sets the default state to an empty array', function() {
    expect(this.component.state.results).toEqual([]);
  });

  describe('findArtists', function() {
    it('returns early if no data is passed through', function() {
      expect(this.component.findArtists()).toBeFalsy();
      expect(this.component.findArtists('')).toBeFalsy();
    });

    it('calls an ajax request to spotify with the query', function() {
      spyOn($, 'ajax');
      this.component.findArtists('foo');
      expect($.ajax).toHaveBeenCalledWith({
        url: 'https://api.spotify.com/v1/search?q=foo&type=artist',
        dataType: 'json',
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it('sets the state with the data returned', function() {
      this.component.findArtists('foobar');
      $.ajax.mock.calls[0][0].success({
        artists: { items: 'foo' }
      });
      expect(this.component.state.results).toEqual('foo');
    });
  });

  it('sets results on the SearchResults', function() {
    var searchResults = TestUtils.findRenderedComponentWithType(this.component, SearchResults);

    expect(searchResults.props.results).toEqual(this.component.state.results)
  });

  it('sets onSearchSubmit tp findArtists on the search form', function() {
    var searchForm = TestUtils.findRenderedComponentWithType(this.component, SearchForm);
    expect(searchForm.props.onSearchSubmit).toEqual(this.component.findArtists);
  });
});
