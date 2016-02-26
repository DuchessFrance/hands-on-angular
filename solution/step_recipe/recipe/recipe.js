angular.module('myHandsOn')
  .controller('RecipeController', function($state, titleSwitcher, Recipe) {
    // TODO handle loading with waiting page
    this.recipe = null;

    Recipe.get($state.params.recipeId)
      .then(function(recipe) {
        this.recipe = recipe;
        titleSwitcher.setTitle(recipe.name.toLowerCase() + ' : Recette de ' + recipe.name.toLowerCase() +
          ' - Marmiton');
      }.bind(this))
      // handle unhappy path
    ;
  })
;
