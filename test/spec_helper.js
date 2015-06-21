// Setup JSDOM:
//
var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

// Setup Chai:

var chai = require('chai');
 
chai.config.includeStack = true;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

// Setup Sinon:

var sinon = require('sinon');
global.sinon = sinon;

// fake xml requests:
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
