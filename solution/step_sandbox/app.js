angular.module('myHandsOn', [])
  .run(function(

    ) {
    console.log('It runs');
  })
  .controller('HomeController', function($scope) {
    $scope.name = 'Virginie';
    this.description = 'awesome';
    this.feelings = 'excited';
  })
;
