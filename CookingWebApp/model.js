var recipeList;

var Recipe = function(name, ingredients, directions, url) {
	this.recipeName = name;
	this.recipeNameNoSpace = this.recipeName.replace(/\s/g, "");
	this.ingredients = ingredients;
	this.directions = directions;
	this.url = url;
	this.templatHTML ="";
};

_.extend(Recipe.prototype, {
	render: function(){
		this.templateHTML = "<div class=\"panel panel-default\">"+
    "<div class=\"panel-heading\" role=\"tab\"id=\"heading"+this.recipeNameNoSpace+"\">"+
      "<h4 class=\"panel-title\">"+
        "<a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"+this.recipeNameNoSpace+"\" aria-expanded=\"true\" aria-controls=\"collapse"+this.recipeNameNoSpace+"\">"+
          this.recipeName+
        "</a>"+
      "</h4>"+
    "</div>"+
    "<div id=\"collapse"+this.recipeNameNoSpace+"\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"heading"+this.recipeNameNoSpace+"\">"+
    	"<div class=\"panel-body\">"+
    	"<h2>Ingredients</h2>";
    	for (var i = 0; i < this.ingredients.length; i++) {
      		this.templateHTML = this.templateHTML + "<div><br>"+this.ingredients[i]+"</div>";
    	};
    	this.templateHTML = this.templateHTML + "<h2>Directions</h2>";
    	for (var i = 0; i < this.directions.length; i++) {
    		this.templateHTML = this.templateHTML + "<div><br>"+this.directions[i]+"</div>";
    	};
        if (this.url !== "") {
        	this.templateHTML = this.templateHTML + "<br><h2>Original Recipe url</h2><br>"+this.url;
        }
      this.templateHTML = this.templateHTML +"</div>"+
    "</div>"+
  "</div>"+
 "</div>";


 	recipeList.append($(this.templateHTML));

	}
});

var RecipeModel = function () {
	this.recipes = [];
	return this;
};

_.extend(RecipeModel.prototype, {
	addRecipe: function(recipe) {
		this.recipes.push(recipe);
		recipe.render();

	},

	getRecipes: function() {
		return this.recipes;
	}
});