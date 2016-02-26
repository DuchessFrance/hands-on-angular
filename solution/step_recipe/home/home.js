angular.module('myHandsOn')
  .controller('HomeController', function($state, titleSwitcher) {
    titleSwitcher.setTitle('Marmiton : 67000 recettes de cuisine ! Recettes commentées et notées pour toutes les ' +
      'cuisines. Recette de cuisine. - Accueil - Marmiton.org');

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
