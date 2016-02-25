angular.module('myHandsOn')
  .controller('SearchController', function($state, titleSwitcher, search) {
    titleSwitcher.setTitle('Chocolat : nos recettes de chocolat délicieuses');

    this.search = function(input) {
      console.log(search)
      this.input = input || this.input;
      if (!this.input || this.searchResult && this.searchResult.searchedValue === this.input) {
        return;
      }
      search.search(this.input).then(function(results) {
        this.searchResult = results;
      }.bind(this));
    };

    this.input = $state.params.search;
    this.search();
  })
;