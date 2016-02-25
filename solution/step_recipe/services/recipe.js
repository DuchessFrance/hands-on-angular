angular.module('myHandsOn')
  .service('Recipe', function($http) {
    this.get = function(recipeId) {
      return $http.get('/api/recipe/' + recipeId)
        .then(function(res) {
          return res.data;
        })
        // handle non-happy path
      ;
    };
  })
;
