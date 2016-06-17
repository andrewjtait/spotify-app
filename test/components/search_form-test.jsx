var Component = require('../../components/search_form.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Search Form component', function() {
  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(
      <Component />
    );
  });

  describe('handleSubmit', function() {
    var ev;

    beforeEach(function() {
      ev = document.createEvent();
      sinon.stub(this.component, 'delegateSearch');
    });

    it('prevents default', function() {
      sinon.spy(ev, 'preventDefault');
      this.component.handleSubmit(ev);
      expect(ev.preventDefault.calledOnce).to.eql(true);
    });

    it('clears the timeout', function() {
      this.component.timer = setTimeout(function() {}, 999);
      this.component.handleSubmit(ev);
      expect(this.component.timer._idleTimeout).to.eql(-1);
    });

    it('calls delegateSearch', function() {
      this.component.handleSubmit(ev);
      expect(this.component.delegateSearch.calledOnce).to.eql(true);
    });
  });

  describe('handleChange', function() {
    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      sinon.stub(this.component, 'delegateSearch');
      this.component.handleChange();
    });

    afterEach(function() {
      clock.restore();
    });

    it('does not call delegate search for 500ms', function() {
      expect(this.component.delegateSearch.calledOnce).to.eql(false);
      clock.tick(500);
      expect(this.component.delegateSearch.calledOnce).to.eql(true);
    });
  });

  describe('delegateSearch', function() {
    beforeEach(function() {
      var node = React.findDOMNode(this.component.refs.query);
      node.value = 'foo';
      // fake the function
      this.component.props.onSearchSubmit = function() {};
      sinon.stub(this.component.props, 'onSearchSubmit');
      this.component.delegateSearch();
    });

    it('calls onSearchSubmit with the query value', function() {
      expect(this.component.props.onSearchSubmit.getCalls()[0].args).to.eql(['foo']);
    });
  });

  describe('render', function() {
    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      sinon.stub(this.component, 'delegateSearch');
    });

    afterEach(function() {
      clock.restore();
    });

    it('calls delegateSearch (through handleSubmit) when the form is submitted', function() {
      var node = TestUtils.findRenderedDOMComponentWithTag(this.component, 'form');
      TestUtils.Simulate.submit(node);
      expect(this.component.delegateSearch.calledOnce).to.eql(true);
    });

    it('calls delegateSearch (through handleChange) when the input changes', function() {
      var node = React.findDOMNode(this.component.refs.query);
      TestUtils.Simulate.change(node);
      expect(this.component.delegateSearch.calledOnce).to.eql(false);
      clock.tick(500);
      expect(this.component.delegateSearch.calledOnce).to.eql(true);
    });
  });
});
