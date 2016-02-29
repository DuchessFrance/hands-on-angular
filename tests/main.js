/**
 * START HERE: test your e2e installation on an external website using Angular
 * THEN: open sandbox.js
 */

'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));
var expect = chai.expect;

/**
 * 1. Test for checking if the e2e tests works. Unskip (remove .skip after describe), checks if it passes, then re-skip
 * A skipped test won't pass, it will be marked as pending by the test framework
 * Re-skip those test for performance purpose, it takes 10s each time you launch gulp test just for those tests that are not linked to your own app
 */
describe.skip('no protractor at all', function() {
  it('should still do normal tests', function() {
    expect(true).to.equal(true);
  });
});

/**
 * 2. Unskip this describe too, then reskip once validated by tests. It should open angularjs.org website.
 */
describe.skip('protractor library', function() {
  /** No need to unskip this one */
  it.skip('should be able to skip tests', function() {
    expect(true).to.equal(false);
  });

  it('should expose the correct global variables', function() {
    expect(protractor).to.exist();
    expect(browser).to.exist();
    expect(by).to.exist();
    expect(element).to.exist();
    expect($).to.exist();
  });

  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get('http://www.angularjs.org');
      todoList = element.all(by.repeater('todo in todoList.todos'));
    });

    it('should list todos', function() {
      return Promise.all([
        expect(todoList.count()).to.eventually.equal(2),
        expect(todoList.get(1).getText()).to.eventually.equal('build an angular app'),
      ]);
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoList.todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      return Promise.all([
        expect(todoList.count()).to.eventually.equal(3),
        expect(todoList.get(2).getText()).to.eventually.equal('write a protractor test'),
      ]);
    });
  });
});