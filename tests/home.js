'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe.skip('home page', function() {
  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('be an angular app', function() {
    expect(element(by.css('[ng-app]')).isPresent()).to.eventually.equal(true);
    expect(element(by.css('[ng-app]')).getAttribute('ng-app')).to.eventually.equal('myHandsOn');
  });

  it('should have its own controller', function() {
    expect(element(by.css('[ng-controller]')).isPresent()).to.eventually.equal(true);
    expect(element(by.css('[ng-controller]')).getAttribute('ng-controller')).to.eventually.equal('HomeController as home');
  });

  it('should have a given title', function() {
    expect(browser.getTitle()).to.eventually.equal('Marmiton : 67000 recettes de cuisine ! Recettes commentées et notées pour toutes les cuisines. Recette de cuisine. - Accueil - Marmiton.org');
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