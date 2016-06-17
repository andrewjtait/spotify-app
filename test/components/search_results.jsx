var Component = require('../../components/search_results.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Artist = require('../../components/artist.jsx');

describe('Search Results component', function() {
  beforeEach(function() {
    var results = [{
      name: 'foo',
      external_urls: { spotify: '/foo_url' },
      images: [{ url: '/foo.jpg' }]
    },{
      name: 'bar',
      external_urls: { spotify: '/bar_url' },
      images: []
    }];

    this.component = TestUtils.renderIntoDocument(
      <Component results={results} />
    );
  });

  describe('render', function() {
    var artist;

    beforeEach(function() {
      artist = TestUtils.scryRenderedComponentsWithType(this.component, Artist);
    });

    it('creates Artist components from the data', function() {
      expect(artist[0].props.name).to.eql('foo');
      expect(artist[0].props.url).to.eql('/foo_url');
      expect(artist[0].props.image).to.eql('/foo.jpg');
    });

    it('sets the url for the image appropriately', function() {
      expect(artist[1].props.name).to.eql('bar');
      expect(artist[1].props.url).to.eql('/bar_url');
      expect(artist[1].props.image).to.eql(null);
    });
  });
}); 
