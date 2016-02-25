'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe('search page', function() {
  before(function() {
    browser.get('http://localhost:9000');
    element(by.model('home.searchInput')).sendKeys('chocolat', protractor.Key.ENTER);
  });

  it('should have its own controller', function() {
    expect(element(by.css('[ng-controller]')).isPresent()).to.eventually.equal(true);
    expect(element(by.css('[ng-controller]')).getAttribute('ng-controller')).to.eventually.equal('SearchController as search');
  });

  it('should have a given title', function() {
    expect(browser.getTitle()).to.eventually.equal('Chocolat : nos recettes de chocolat délicieuses');
  });

  it('should display the breadcrumbs', function() {
    expect(element(by.id('mrm_locationbar')).isPresent()).to.eventually.equal(true);
  });

  describe('to home page', function() {
    afterEach(function() {
      browser.get('http://localhost:9000');
      element(by.model('home.searchInput')).sendKeys('chocolat', protractor.Key.ENTER);
    });

    it('should go to home page on click on the breadcrumbs', function() {
      var link = element(by.id('mrm_locationbar')).element(by.tagName('a'));
      link.click()
      expect(browser.getLocationAbsUrl()).to.eventually.match(/\/$/);
    });
  });

  it('should display a search input, with a given placeholder initialized to my search value', function() {
    expect(element(by.model('search.input')).getTagName()).to.eventually.equal('input');
    expect(element(by.model('search.input')).getAttribute('type')).to.eventually.equal('text');
    expect(element(by.model('search.input')).isDisplayed()).to.eventually.equal(true);
    expect(element(by.model('search.input')).getAttribute('placeholder')).to.eventually.exist();
    expect(element(by.model('search.input')).getAttribute('value')).to.eventually.equal('chocolat');
  });

  it('should display a search button', function() {
    expect(element(by.id('searchButton')).isDisplayed()).to.eventually.equal(true);
  });

  describe('new search', function() {
    afterEach(function() {
      browser.get('http://localhost:9000');
      element(by.model('home.searchInput')).sendKeys('chocolat', protractor.Key.ENTER);
    });

    it('should make a new search on click on the search button if a new text has been set', function() {
      element(by.model('search.input')).clear().sendKeys('durian', protractor.Key.ENTER);
      expect(element(by.model('search.input')).getAttribute('value')).to.eventually.equal('durian');
      expect(element(by.id('searchSummary')).getText()).to.eventually.match(/durian/);
      expect(element.all(by.repeater('result in search.searchResult.elements')).count()).to.eventually.equal(1);
    });

    it('should not make a new search on click on the search button if no new text has been set', function() {
      element(by.model('search.input')).clear().sendKeys('chocolat', protractor.Key.ENTER);
      expect(element(by.model('search.input')).getAttribute('value')).not.to.eventually.equal('durian');
      expect(element(by.id('searchSummary')).getText()).not.to.eventually.match(/durian/);
    });

    it('should not make a new search on click on the search button if no new text has been set', function() {
      element(by.model('search.input')).clear().sendKeys(protractor.Key.ENTER);
      expect(element(by.id('searchSummary')).getText()).not.to.eventually.match(/Recherche pour ""/);
    });
  });

  describe('empty search', function() {
    afterEach(function() {
      browser.get('http://localhost:9000');
      element(by.model('home.searchInput')).sendKeys('chocolat', protractor.Key.ENTER);
    });

    it('should display no element and suggestion but not total number', function() {
      element(by.model('search.input')).clear().sendKeys('else', protractor.Key.ENTER);
      expect(element(by.id('searchSummary')).getText()).to.eventually.match(/ucun résultat/);
      expect(element(by.id('searchSummary')).getText()).to.eventually.match(/orthographe/);
      expect(element(by.id('searchSummary')).getText()).not.to.eventually.match(/0 \/ 0/);
    });

    it('should display all suggestions, which launch a new search', function() {
      element(by.model('search.input')).clear().sendKeys('else', protractor.Key.ENTER);
      expect(element(by.id('searchSummary')).getText()).to.eventually.match(/chocolat ou durian/);

      element(by.id('searchSummary')).element(by.tagName('a')).click();
      expect(element(by.model('search.input')).getAttribute('value')).to.eventually.equal('chocolat');
    });

    it('should not display pagination', function() {
      expect(element(by.className('m_resultat_liste_pagination')).isDisplayed()).to.eventually.equal(false);
    });
  });

  it('should display a summary for the current search that contains the searched item, the number of elements found and displayed', function() {
    expect(element(by.id('searchSummary')).isDisplayed()).to.eventually.equal(true);
    expect(element(by.id('searchSummary')).getText()).to.eventually.match(/chocolat/);
    expect(element(by.id('searchSummary')).getText()).to.eventually.match(/10/);
    expect(element(by.id('searchSummary')).getText()).to.eventually.match(/30334/);
  });

  it('should not display the no element info nor the suggestion if some elements found', function() {
    expect(element(by.id('searchSummary')).getText()).not.to.eventually.match(/ucun résultat/);
    expect(element(by.id('searchSummary')).getText()).not.to.eventually.match(/orthographe/);
  });

  it('should display the 12 first recipes found', function() {
    expect(element.all(by.repeater('result in search.searchResult.elements')).count()).to.eventually.equal(12);
  });

  /*it('should highlight searched keyword', function() {
    expect(element.all(by.repeater('result in search.searchResult.elements')).get(1).element(by.class('m_texte_resultat')).getText()).to.eventually.match(/<b>chocolat</b>/i);
  });*/

  it('should display pagination', function() {
    expect(element(by.className('m_resultat_liste_pagination')).isDisplayed()).to.eventually.equal(true);
  });
});