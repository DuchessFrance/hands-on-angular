angular.module('myHandsOn', [
'ui.router',
])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
      })
      .state('search', {
        url: '/search',
        templateUrl: 'search/search.html',
      })
    ;
  })
;
