angular.module('myHandsOn')
  .service('search', function($http) {
    this.search = function(searchValue) {
      return $http.post('/api/search', {
          value: searchValue,
        })
        .then(function(res) {
          res.data.searchedValue = searchValue;
          return res.data;
        })
        // TODO unhappy path
      ;
    }
  })
;