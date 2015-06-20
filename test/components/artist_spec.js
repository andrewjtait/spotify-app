var Artist = require('../../components/artist.js');

var React = require('react/addons');
var assert = require('assert');
var TestUtils = React.addons.TestUtils;

describe('Artist component', function() {
  beforeEach(function() {
    var component = TestUtils.renderIntoDocument(
      <Artist name='Fleetwood Mac' url='/foo' />
    );
    var anchor = TestUtils.findRenderedDOMComponentWithTag(component, 'a');
    this.anchor = anchor.getDOMNode();
    var title = TestUtils.findRenderedDOMComponentWithClass(component, 'title');
    this.title = title.getDOMNode();
  });

  it('renders an anchor with href from the props', function() {
    assert(this.anchor.getAttribute('href') == '/foo');
  });

  it('renders the title from the props', function() {
    assert(this.title.innerHTML == 'Fleetwood Mac');
  });

  describe('without images', function() {
    beforeEach(function() {
      var component = TestUtils.renderIntoDocument(
        <Artist name='Fleetwood Mac' url='/foo' />
      );
      var image = TestUtils.findRenderedDOMComponentWithTag(component, 'div');
      this.image = image.getDOMNode();
    });

    it('renders the correct CSS for the image', function() {
      assert(this.image.getAttribute('style') == 'background-image:none;');
    });
  });

  describe('with images', function() {
    beforeEach(function() {
      var component = TestUtils.renderIntoDocument(
        <Artist name='Fleetwood Mac' url='/foo' image='/foo.jpg' />
      );
      var image = TestUtils.findRenderedDOMComponentWithTag(component, 'div');
      this.image = image.getDOMNode();
    });

    it('renders the correct CSS for the image', function() {
      assert(this.image.getAttribute('style') == 'background-image:url(/foo.jpg);');
    });
  });
});
