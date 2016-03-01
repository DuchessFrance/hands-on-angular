/**
 * PREVIOUS: sandbox.js
 * NEXT: search.js
 */

'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

/**
 * Let's start animating our first page. The web designer have prepared some templates. We're gonna start with the home page template that can be found at `http://localhost:9000/templates/home.html`.
 * Copy all the content of `client/template/home.html` in `client/index.html`. The first step are quite similar to those of `sandbox.js`.
 * Checks
 */
describe('home page', function() {
  /**
   * First of all, this step will fail if no angular script has been loaded on the HTML page. The build system takes it from the node modules and copy it in the `lib` folder of your builded app.
   * 1. Load `lib/angular.js` at the bottom of your body
   */
  before(function() {
    browser.get('http://localhost:9000');
  });

  /**
   * Some slight differences. Now that we are in a "real" application, you should think of where to put this tag. If it's on the body, I won't be able to update something in the head.
   * 1. Load `app.js` at the bottom of your body
   */
  it('be an angular app', function() {
    return Promise.all([
      expect(element(by.css('[ng-app]')).isPresent()).to.eventually.equal(true),
      expect(element(by.css('[ng-app]')).getAttribute('ng-app')).to.eventually.equal('myHandsOn'),
    ]);
  });

  /**
   * Some slight differences too. Now that we are in a "real" application, you should think of where to put this tag. What is the future static part of my HTML? Which part of the HTML should be "controlled"?
   */
  it('should have its own controller', function() {
    return Promise.all([
      expect(element(by.css('[ng-controller]')).isPresent()).to.eventually.equal(true),
      expect(element(by.css('[ng-controller]')).getAttribute('ng-controller')).to.eventually.equal('HomeController as home'),
    ]);
  });

  /**
   * This step should be trivial since it is already done in the template. But we want to watch for it to avoid regression on updates
   */
  it('should have a given title', function() {
    return expect(browser.getTitle()).to.eventually.equal('Marmiton : 67000 recettes de cuisine ! Recettes commentées et notées pour toutes les cuisines. Recette de cuisine. - Accueil - Marmiton.org');
  });

  /**
   * Here we want to check for a little of structuration. A class might have also be used instead of an ID.
   * 1. Add the `searchTitle` ID on the right element
   */
  it('should display the search title', function() {
    return expect(element(by.id('searchTitle')).isPresent()).to.eventually.equal(true);
  });

  /**
   * Checks for the input[type=text] to exist, to have a ng-model and to be visible.
   * 1. Add a `ng-model` attribute to the right input, with a value of `home.searchInput`
   * 2. Create the `searchInput` property on your HomeController
   */
  it('should display a search input, with a given placeholder', function() {
    return Promise.all([
      expect(element(by.model('home.searchInput')).getTagName()).to.eventually.equal('input'),
      expect(element(by.model('home.searchInput')).getAttribute('type')).to.eventually.equal('text'),
      expect(element(by.model('home.searchInput')).isDisplayed()).to.eventually.equal(true),
      expect(element(by.model('home.searchInput')).getAttribute('placeholder')).to.not.eventually.be.empty(),
    ]);
  });

  /**
   * This one is easy too.
   * 1. Put an ID `searchButton` on the button that will launch a search
   * It is possible that the test fails if your browser resolution is not wide enough. Then this button is hidden by the input hitbox.
   */
  it('should display a search button', function() {
    return expect(element(by.id('searchButton')).isDisplayed()).to.eventually.equal(true);
  });

  /**
   * Let's start some big refactoring
   * An Angular app is a Single Page App (SPA), which means that in opposition to standard client/server interaction where each click generates a new response of the server to create the asked resource, all the application layout and navigation is loaded on the run of a SPA.
   * Routing is no more handled by the server, but by Angular. In that way, we're gonna refactor our rising application with one page to be ready to have ... two pages.
   * There are two well-known routing angular plugin that can be used: ng-route and ui-router. The first one is edited by Angular team. The second one by the UI team. We're gonna use ui-router.
   * It has already been loaded on the `lib` folder by the build system (step 1 on [ui-router's doc](https://github.com/angular-ui/ui-router)).
   * 1. Load `lib\angular-ui-router.js` between Angular and your app (step 2 on [ui-router's doc](https://github.com/angular-ui/ui-router)).
   * 2. Tell your application to use this plugin by setting it on your `app.js`. `angular.module(appName, extModuleNames)` is perfect to do so. For now, `angular.module('myHandsOn', [])` has no dependency, as you can see with this second argument that is an empty array. To add ui-router as a dependency, checks [ui-router repository](https://github.com/angular-ui/ui-router)'s step 3.
   * Now, we're gonna use ui-router with our single page
   * 3. In `index.html`, determine which part is static and which is dynamic
   * 4. Create a `home` folder at the root of your project. All home related features, controllers and views will be found in this folder
   * 5. Create a `home\home.html` file and copy inside your dynamic part of your `index.html`. Check that your dynamic part has the `ng-controller` tag inside
   * 6. Create a `home\home.js` file. Copy in it your `HomeController`. The `.controller` function must be invocated from the app module. To get it, use `angular.module(appName)`. Note that without a second argument, the `angular.module` function behave like a getter, but with a second argument, it's a setter. It's due to jQuery legacy (after all, angular use jQlite, which is a light jQuery). No need to load your `home\homeController.js` file, it's already done by the build system which concatenate and ngAnnotate it in the generated `app.js`.
   * 7. In `index.html`, replace your dynamic HTML a '<div ui-view></div>' like in [ui-router's doc, step 2](https://github.com/angular-ui/ui-router#nested-states--views)
   * 8. As described in [ui-router's doc, step 5](https://github.com/angular-ui/ui-router#nested-states--views), in your `app.js`, add a new `.config(injectionFunction)` block, where you inject `$urlRouterProvider`. Define your default route to `/` using `$urlRouterProvider.otherwise(route)`, since no 404 have been set for now.
   * 9. In your `home.js`, as described in [ui-router's doc, step 5](https://github.com/angular-ui/ui-router#nested-states--views), add a new `.config(injectionFunction)` block, where you inject `$stateProvider`. Define your first state `home`, by setting its URL to `/` and its template to `home/home.html`.
   * Fine! There is no more features, but it's a better base to add new pages
   */
  describe('to search page', function() {
    afterEach(function() {
      browser.get('http://localhost:9000');
    });

    /**
     * This step should be trivial since it is already the case. But it will be adressed when you code the search button navigation.
     * 1. Then, to do so, you'll need to add a check on the home.search function. If no searchInput is found, just return, do not do anything more
     */
    it('should not go to search page on click on the search button if no search has been made', function() {
      var searchButton = element(by.id('searchButton'));
      searchButton.click();
      expect(browser.getLocationAbsUrl()).not.to.eventually.match(/\/search$/);
    });

    it('should go to search page on click on the search button if a search has been made', function() {
      var input = element(by.model('home.searchInput'));
      var searchButton = element(by.id('searchButton'));
      input.sendKeys('chocolat');
      searchButton.click();
      expect(browser.getLocationAbsUrl()).to.eventually.match(/\/search$/);
    });

    it('should not go to search page by typing enter on the search input if no search has been made', function() {
      var input = element(by.model('home.searchInput'));
      input.sendKeys(protractor.Key.ENTER);
      expect(browser.getLocationAbsUrl()).not.to.eventually.match(/\/search$/);
    });

    it('should go to search page by typing enter on the search input if a search has been made', function() {
      var input = element(by.model('home.searchInput'));
      input.sendKeys('chocolat', protractor.Key.ENTER);
      expect(browser.getLocationAbsUrl()).to.eventually.match(/\/search$/);
    });
  });
});
