angular.module('myHandsOn')
  .service('titleSwitcher', function() {
    this.title = '';

    this.setTitle = function(newTitle) {
      this.title = newTitle[0].toUpperCase() + newTitle.slice(1);
    };
  })
;
