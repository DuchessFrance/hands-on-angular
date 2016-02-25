'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe.skip('recipe page', function() {
  before(function() {
    browser.get('http://localhost:9000/#/recipe/cake_choco');
  });

  it('should have its own controller', function() {
    expect(element(by.css('[ng-controller]')).isPresent()).to.eventually.equal(true);
    expect(element(by.css('[ng-controller]')).getAttribute('ng-controller')).to.eventually.equal('RecipeController as detail');
  });

  it('should have a given title', function() {
    expect(browser.getTitle()).to.eventually.equal('Cake au chocolat : Recette de cake au chocolat - Marmiton');
  });

  it('should display the breadcrumbs', function() {
    expect(element(by.id('mrm_locationbar')).isPresent()).to.eventually.equal(true);
  });

  describe('to home page', function() {
    afterEach(function() {
      browser.get('http://localhost:9000/#/recipe/cake_choco');
    });

    it('should go to home page on click on the breadcrumbs', function() {
      var link = element(by.id('mrm_locationbar')).element(by.tagName('a'));
      link.click()
      expect(browser.getLocationAbsUrl()).to.eventually.match(/\/$/);
    });
  });
});
