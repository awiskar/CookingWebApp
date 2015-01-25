	'use strict';

window.addEventListener('load', function() {

	recipeList = $("#recipeList");

	var hometab = document.getElementById("hometab");
	var addrecipetab = document.getElementById("addrecipetab");
	var viewrecipetab = document.getElementById("viewrecipetab");

	var homepage = document.getElementById("homepage");
	var addrecipe = document.getElementById("addrecipe");
	var viewrecipes = document.getElementById("viewrecipes");

	var addWebRecipeBtn = document.getElementById("inputWebRecipeBtn");
	var myRecipeModel = new RecipeModel();

	addWebRecipeBtn.addEventListener('click', function(){
		var recipeURL = document.getElementById("webURL").value;
		var getRecipePage = jQuery.get(recipeURL, {}, function(response){
			var responseDocument = $(response);
			var recipeTitle = responseDocument.find("#recipe")[1].innerHTML;
			var content = responseDocument.find(".content")[1].innerText;

			var lines = content.split('\n');

			var ingredients = [];
			var directions = [];
			var firstChar;
			var validIngredientsEntries = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 188, 189, 190];

			for (var i = 2; i < lines.length-1; i++) {
				firstChar = lines[i].charCodeAt(0);
				if (_.contains(validIngredientsEntries, firstChar)) {
					ingredients.push(lines[i]);
				}
				else {
					directions.push(lines[i]);
				}
			}


			var newRecipe = new Recipe(recipeTitle, ingredients, directions, recipeURL);
			myRecipeModel.addRecipe(newRecipe);
			

		});

	});



















	hometab.addEventListener('click', function(){
		var homeNoDispLoc = homepage.className.search("nodisplay");
		var addNoDispLoc = addrecipe.className.search("nodisplay");
		var viewNoDispLoc = viewrecipes.className.search("nodisplay");

		var addtabActive = addrecipetab.className.search("active");
		var viewtabActive = viewrecipetab.className.search("active");

		if (homeNoDispLoc !== -1) {
			homepage.className = homepage.className.substring(0, homeNoDispLoc);
			hometab.className = hometab.className + " active";
		}
		if (addNoDispLoc === -1) {
			addrecipe.className = addrecipe.className + " nodisplay";
			hometab.className = hometab.className.substring(0, addtabActive);
		}
		if (viewNoDispLoc === -1) {
			viewrecipes.className = viewrecipes.className + " nodisplay";
			viewrecipetab.className = viewrecipetab.className.substring(0, viewtabActive);
		}
	});

	addrecipetab.addEventListener('click', function(){
		var homeNoDispLoc = homepage.className.search("nodisplay");
		var addNoDispLoc = addrecipe.className.search("nodisplay");
		var viewNoDispLoc = viewrecipes.className.search("nodisplay");

		var hometabActive = hometab.className.search("active");
		var viewtabActive = viewrecipetab.className.search("active");

		if (addNoDispLoc !== -1) {
			addrecipe.className = addrecipe.className.substring(0, addNoDispLoc);
			addrecipetab.className = addrecipetab.className + " active";
		}
		if (homeNoDispLoc === -1) {
			homepage.className = homepage.className + " nodisplay";
			hometab.className = hometab.className.substring(0, hometabActive);
		}
		if (viewNoDispLoc === -1) {
			viewrecipes.className = viewrecipes.className + " nodisplay";
			viewrecipetab.className = viewrecipetab.className.substring(0, viewtabActive);
		}
	});

	viewrecipetab.addEventListener('click', function(){
		var homeNoDispLoc = homepage.className.search("nodisplay");
		var addNoDispLoc = addrecipe.className.search("nodisplay");
		var viewNoDispLoc = viewrecipes.className.search("nodisplay");

		var hometabActive = hometab.className.search("active");
		var addtabActive = addrecipetab.className.search("active");

		if (viewNoDispLoc !== -1) {
			viewrecipes.className = viewrecipes.className.substring(0, viewNoDispLoc);
			viewrecipetab.className = viewrecipetab.className + " active";
		}
		if (addNoDispLoc === -1) {
			addrecipe.className = addrecipe.className + " nodisplay";
			addrecipetab.className = addrecipetab.className.substring(0, addtabActive);
		}
		if (homeNoDispLoc === -1) {
			homepage.className = homepage.className + " nodisplay";
			hometab.className = hometab.className.substring(0, hometabActive);
		}
	});

























});
