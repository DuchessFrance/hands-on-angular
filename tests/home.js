'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe('home page', function() {
  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('should display the search title', function() {
    expect(element(by.id('searchTitle')).isPresent()).to.eventually.equal(true);
  });

  it('should display a search input, with a given placeholder', function() {
    expect(element(by.model('home.searchInput')).getTagName()).to.eventually.equal('input');
    expect(element(by.model('home.searchInput')).getAttribute('type')).to.eventually.equal('text');
    expect(element(by.model('home.searchInput')).isDisplayed()).to.eventually.equal(true);
    expect(element(by.model('home.searchInput')).getAttribute('placeholder')).to.eventually.exist();
  });

  it('should display a search button', function() {
    expect(element(by.id('searchButton')).isDisplayed()).to.eventually.equal(true);
  });

  it('should go to search page on click on the search button', function() {
    var searchButton = element(by.id('searchButton'));
    searchButton.click();
  });

  it('should go to search page by typing enter on the search input', function() {
    var input = element(by.model('home.searchInput'));
    input.sendKeys(protractor.Key.CONTROL);
  });
});