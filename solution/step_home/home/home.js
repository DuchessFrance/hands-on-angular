angular.module('myHandsOn')
  .controller('HomeController', function($state) {
    this.searchInput = '';
    this.search = function() {
      if (!this.searchInput.length) {
        return;
      }
      $state.go('search', {
        search: this.searchInput,
      });
    };
  })
;
