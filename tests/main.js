'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('dirty-chai'));

var expect = chai.expect;

describe('no protractor at all', function() {
  it('should still do normal tests', function() {
    expect(true).to.equal(true);
  });
});

describe('protractor library', function() {
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
      expect(todoList.count()).to.eventually.equal(2);
      expect(todoList.get(1).getText()).to.eventually.equal('build an angular app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoList.todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).to.eventually.equal(3);
      expect(todoList.get(2).getText()).to.eventually.equal('write a protractor test');
    });
  });
});