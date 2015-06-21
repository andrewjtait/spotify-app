var Component = require('../../components/find_artists_component.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var SearchResults = require('../../components/search_results.js');
var SearchForm = require('../../components/search_form.js');

describe('Find Artists Component', function() {
  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(
      <Component />
    );
  });

  it('sets the default state to an empty array', function() {
    expect(this.component.state.results).to.eql([]);
  });

  describe('findArtists', function() {
    var requests;

    beforeEach(function() {
      requests = [];
      XMLHttpRequest.onCreate = function (req) { requests.push(req); };
    });

    it('returns early if no data is passed through', function() {
      expect(this.component.findArtists()).to.equal(false);
      expect(this.component.findArtists('')).to.equal(false);
    });

    it('calls an ajax request to spotify with the query', function() {
    });

    it('sets the state with the data returned', function() {
      this.component.findArtists('foobar');
      requests[0].respond(
        200,
        "",
        JSON.stringify({ artists: { items: ['foo'] }})
      );
      expect(this.component.state.results).to.eql(['foo']);
    });
  });

  it('sets results on the SearchResults', function() {
    var searchResults = TestUtils.findRenderedComponentWithType(this.component, SearchResults);

    expect(searchResults.props.results).to.equal(this.component.state.results)
  });

  it('sets onSearchSubmit tp findArtists on the search form', function() {
    var searchForm = TestUtils.findRenderedComponentWithType(this.component, SearchForm);
    expect(searchForm.props.onSearchSubmit).to.equal(this.component.findArtists);
  });
});