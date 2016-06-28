/**
 * PREVIOUS: main.js
 * NEXT: home.js
 */

'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

/**
 * The sandbox page is the actual index.html page in `client` folder. It does almost nothing, you can check it on `http://localhost:9000`
 * The goal of this sandbox is to initialize a very simple first angular app
 * Unskip this describe and skip all it of this file. In TDD, we'll unskip test by test. Each unskipped test will fail and you'll have to fix it
 * Once all those tests have been fixed, skip this describe and open `tests/home.js`
 */
describe.skip('sandbox page', function() {
  /**
   * First of all, the e2e framework wil open this page and synchronize with angular to wait for a fully loaded page
   */
  before(function() {
    browser.get('http://localhost:9000');
  });

  /**
   * 1. The entrypoint of your angular app is your HTML. No tests will be done on the Javascript.
   * First of all, we need to initialize an Angular app (see `client/app.js`). To do so, a angular module has been created (`angular.module(moduleName, externalModules[])` for creation, then `angular.module(moduleName)` to access it [doc](https://docs.angularjs.org/guide/module))
   * Angular has been created to allow multiple modules to work along. In fact, it never happens to have more than one module for a given app
   * Note that ng is the diminutive of Angular, so to bind your newly created JS app with your HTML, create on a top level HTML tag (`body`, `html`) a `ng-app`attribute with a value corresponding to your module name (here `myHandsOn`)
   * By doing this, you allow Angular to take control of the tags contained by the `ng-app` tag to extend the original HTML tag and add its own `ng-*` tags
   * You also let angular take control of {{}} data (data-binded values, {{ is called a mustache)
   * An Angular app creates a namespace named `$rootScope`. It is considered as a bad practice to interact with the $rootScope (or for certain reasons, like we'll see further)
   * To checks if it works, open your browser console and check if there is a "It works" logged in. This log is fired from the `.run` block of your application, so when the bootstrap of your application is done and when it starts to run.
   * Note also that ' (single quotes) are used in JS, " (double quotes) in HTML
   */
  it('be an angular app', function() {
    return Promise.all([
      expect(element(by.css('[ng-app]')).isPresent()).to.eventually.equal(true),
      expect(element(by.css('[ng-app]')).getAttribute('ng-app')).to.eventually.equal('myHandsOn'),
    ]);
  });

  /**
   * 1. Create a controller attribute on a lower level HTML tag, in your angular app (so in a tag contained by your angular app tag)
   * It will create a more localized namespace where you'll be able to plug your application data stores and service to your view
   * Note that a controller has a namespace name `$scope`, which is directly available in the view.
   * The value of the `ng-controller` attribute is the name of the controller like defined in your Angular module (here, it is `HomeController`). Since XXXController is a quite long apellation, you can specify an alias by using `as XXX`. In your controller, when you then use `XXX`, it refers to your controller and to what you put in it, using `this` on the JS part
   * 2. Create your JS controller on your angular module. `angular.module` returns your module, so, like the `.run`, add a `.controller`. The basic API is `module.controller(controllerName, arrayContainingTheInjectedNamesAndTheInjectionFunction)`, but ngAnnotate allows us to simply use `module.controller(controllerName, injectionFunction)`
   * The injection function is dependency injection. Each parameter is the name of an injected service (like `$rootScope` or `$scope`). For now, it is empty, since no services are needed.
   * In your injection function, you can add some code that will be run when the controller is created, like a log.
   */
  it('should have its own controller', function() {
    return Promise.all([
      expect(element(by.css('[ng-controller]')).isPresent()).to.eventually.equal(true),
      expect(element(by.css('[ng-controller]')).getAttribute('ng-controller')).to.eventually.equal('HomeController as home'),
    ]);
  });

  /**
   * Display something on the view from the controller's scope.
   * 1. On your HTML, inside your controller, add a new `div#name` that contains `Hello, my name is {{name}}.`
   * 2. On your controller, inject `$scope`. The basic API is `module.controller(controllerName, ['$scope', function($scope) { // ... }])`, but ngAnnotate allows us to simply use `module.controller(controllerName, function($scope) { // ... })`, which prevents some dumb errors like typos or switching argument on the injection function only. Quite convenient, isn't it?
   * 3. On your controller, add a new data to your scope: `$scope.name = 'Virginie';` for instance
   * Go to `http://localhost:9000`. Your name is displayed!
   */
  it('should display your name', function() {
    return Promise.all([
      expect(element(by.id('name')).isPresent()).to.eventually.equal(true),
      expect(element(by.id('name')).getText()).not.to.eventually.equal('Hello, my name is {{name}}.'),
      expect(element(by.id('name')).getText()).not.to.eventually.equal('Hello, my name is name.'),
      expect(element(by.id('name')).getText()).to.eventually.equal('Hello, my name is Virginie.'),
    ]);
  });

  /**
   * Angular is forgiving. If you put an error in HTML files, it won't tell you that an error occurred since it is bothering for a user interface to splash message errors
   * 1. On your HTML, inside your controller, add a new `div#forgive` that contains `I {{doNot}}love Angular.`
   * Go to `http://localhost:9000`. Your dislike is forgiven!
   */
  it('should not display your dislike (it forgives you)', function() {
    return Promise.all([
      expect(element(by.id('forgive')).isPresent()).to.eventually.equal(true),
      expect(element(by.id('forgive')).getText()).not.to.eventually.equal('I doNotlove Angular.'),
      expect(element(by.id('forgive')).getText()).not.to.eventually.equal('I {{doNot}}love Angular.'),
      expect(element(by.id('forgive')).getText()).to.eventually.equal('I love Angular.'),
    ]);
  });

  /**
   * Display something on the view from the controller itself.
   * 1. On your HTML, inside your controller, add a new `div#description` that contains `Here is my {{home.description}} content.`
   * 2. On your controller, add a new data to your controller: `this.description = 'awesome';` for instance
   * Go to `http://localhost:9000`. Your mindset about this content is displayed!
   * It's considered as a better way to handle data-binding with the view since it creates a new dedicated namespace and doesn't pollute $scope, which is kind of reserved to Angular
   */
  it('should display your mindset', function() {
    return Promise.all([
      expect(element(by.id('description')).isPresent()).to.eventually.equal(true),
      expect(element(by.id('description')).getText()).to.eventually.equal('Here is my awesome content.'),
    ]);
  });

  /**
   * Display something on the view from the controller itself which is binded to an input
   * 1. On your HTML, inside your controller, add a new `div#feelings` that contains `I'm feeling {{home.feelings}}.`
   * 2. On your HTML, inside your controller, add a new input `<input type="text" ng-model="home.feelings" />`
   * It is binded to the HomeController feelings property. You have nothing to do, the current value of the input is in the feeling property (one-way data-binding)
   * 3. On your controller, add a new data to your controller: `this.feelings = 'excited';` for instance. Your input will display excited by default
   * Go to `http://localhost:9000`. Your feelings are displayed!
   * If you type another feeling in the input, you can see it instantly modified in the view. It's double data-binding. The view can update the model and the model update the view when it's updated
   */
  it('should display your varying feelings', function() {
    return Promise.all([
      expect(element(by.id('feelings')).isPresent()).to.eventually.equal(true),
      expect(element(by.model('home.feelings')).isPresent()).to.eventually.equal(true),
      expect(element(by.id('feelings')).getText()).to.eventually.equal('I\'m feeling excited.'),
      element(by.model('home.feelings')).clear().sendKeys('amazed'),
      expect(element(by.id('feelings')).getText()).to.eventually.equal('I\'m feeling amazed.'),
    ]);
  });
});
