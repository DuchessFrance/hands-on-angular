angular.module('myHandsOn')
  .filter('description', function($sce) {
    return function(value, search) {
      var differentSearches = search.split(' ');
      for (var i = 0; i < differentSearches.length; i++) {
        value = value.replace(new RegExp('(' + differentSearches[i] + ')', 'ig'), '<b>$1</b>');
      }

      return $sce.trustAsHtml(value);
    };
  })
;
