angular.module('myHandsOn', [
    'ui.router',
  ])
  .run(function() {
    console.log('it runs');
  })
  .config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('404');
    $stateProvider
    .state('404', {
      url: '/#/404',
      templateUrl: '404.html',
    })
  })
;
