angular.module('myHandsOn', [
'ui.router',
])
  .run(function($rootScope, titleSwitcher) {
    $rootScope.titleSwitcher = titleSwitcher;
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
      })
      .state('search', {
        url: '/search',
        params: {
          search: '',
        },
        templateUrl: 'search/search.html',
      })
      .state('recipe', {
        url: '/recipe/:recipeId',
        params: {
          recipeId: '',
        },
        templateUrl: 'recipe/recipe.html',
      })
    ;
  })
;
