angular.module('myHandsOn')
  .controller('SearchController', function($state, titleSwitcher, search) {
    titleSwitcher.setTitle($state.params.search.toLowerCase() + ' : nos recettes de ' + $state.params.search.toLowerCase() + ' délicieuses');

    this.search = function(input) {
      console.log(search)
      this.input = input || this.input;
      if (!this.input || this.searchResult && this.searchResult.searchedValue === this.input) {
        return;
      }
      search.search(this.input).then(function(results) {
        this.searchResult = results;
        titleSwitcher.setTitle(this.searchResult.searchedValue.toLowerCase() + ' : nos recettes de ' + this.searchResult.searchedValue.toLowerCase() + ' délicieuses');
      }.bind(this));
    };

    this.input = $state.params.search;
    this.search();

    this.goTo = function(id) {
      $state.go('recipe', {
        recipeId: id,
      });
    };
  })
;