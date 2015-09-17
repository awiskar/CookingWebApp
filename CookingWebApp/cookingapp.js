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

	for (var recipeName in localStorage) {
		if (recipeName[0] == "$") {
			var recipe = JSON.parse(localStorage[recipeName])		
			recipe = new Recipe(recipe["recipeName"],
								recipe["ingredients"],
								recipe["directions"],
								recipe["url"],
								recipe["templateHTML"]);

			myRecipeModel.addRecipe(recipe);
		};
	};

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


	var addIngredientsBtn = document.getElementById("addIngredientsBtn");
	var customIngredientsList = $('#ingredientsList');
	var ingTemplateHTML = "";
	var i = 1;

	var ingredientsInputClass = $(".ingredientsInput");

	var addIngredientField = function() {
		ingTemplateHTML = "";
		i = i+1;
		ingTemplateHTML = "<div class=\"input-group\" id=\"ingredient"+i+"group\">"+
		"<span class=\"input-group-addon\" id=\"basic-addon"+(i+1)+"\">Ingredient "+i+"</span>"+
		"<input type=\"text\" class=\"form-control ingredientsInput\" placeholder=\"Ingredient "+i+" goes here\" aria-describedby=\"bassic-addon"+(i+1)+"\" id=\"ingredient"+i+"\">"+
		"</div>";
		var newListItem = $(ingTemplateHTML);
		customIngredientsList.append(newListItem);
		newListItem.children()[1].focus();
		newListItem.keypress(function(e){
			if(e.which === 13) {
				addIngredientField();
			}
		});
	};

	addIngredientsBtn.addEventListener('click', function(){
		addIngredientField();

	});

	ingredientsInputClass.keypress(function(e) {
		if (e.which === 13) {
			addIngredientField();
		}
	});

	var addDirectionsBtn = document.getElementById("addDirectionsBtn");
	var customDirectionsList = $('#directionsList');
	var dirTemplateHTML = "";
	var o = 1;

	var directionsInputClass = $(".directionsInput");

	var addDirectionStep = function() {
		dirTemplateHTML = "";
		o = o+1;
		dirTemplateHTML = "<div class=\"input-group\" id=\"direction"+o+"group\">"+
		  	"<span class=\"input-group-addon\" id=\"basic-addon"+(o+1)+"\">Step "+o+"</span>"+
			"<input type=\"text\" class=\"form-control directionsInput\" placeholder=\"Step "+o+" goes here\" aria-describedby=\"bassic-addon"+(o+1)+"\" id=\"direction"+o+"\">"+
	  	"</div>";

	  	var newListItem = $(dirTemplateHTML);

	  	customDirectionsList.append(newListItem);
	  	newListItem.children()[1].focus();
	  	newListItem.keypress(function(e) {
			if (e.which === 13) {
				addDirectionStep();
			}
		});
	};

	addDirectionsBtn.addEventListener('click', function(){
		addDirectionStep();
	});


	directionsInputClass.keypress(function(e) {
		if (e.which === 13) {
			addDirectionStep();
		}
	});

	var submitRecipeBtn = document.getElementById("submitRecipeBtn");

	submitRecipeBtn.addEventListener('click', function(){
		var recipeTitle = document.getElementById("customRecipeTitle").value;
		var ingredients = [];
		var directions = [];
		var url = "";
		var ingredientsGroup = document.getElementById("ingredientsList");
		var directionsGroup = document.getElementById("directionsList");
		var nodeOfInterest;
		if (recipeTitle === "Recipe Title Goes Here" || recipeTitle === "") {
			alert("Recipe must have a title to add it to your recipe box");
			return;
		}
		_.each(ingredientsGroup.children, function(node){
			nodeOfInterest = node.children[1].value;
			if (nodeOfInterest !== "" && nodeOfInterest.split(" ")[0] !== "Ingredient" ) {
				ingredients.push(nodeOfInterest);
			}
			
		});


		_.each(directionsGroup.children, function(node){
			nodeOfInterest = node.children[1].value;
			if (nodeOfInterest !== "" && nodeOfInterest.split(" ")[0] !== "Step") {
				directions.push(nodeOfInterest);
			}
		});

		var newRecipe = new Recipe(recipeTitle, ingredients, directions, url);
		myRecipeModel.addRecipe(newRecipe);

		customIngredientsList.children().not('first').remove();
		customIngredientsList.append("<div class=\"input-group\" id=\"ingredient1group\"><span class=\"input-group-addon\" id=\"basic-addon2\">Ingredient 1</span><input type=\"text\" class=\"form-control\" placeholder=\"Ingredient 1 goes here\" aria-describedby=\"bassic-addon2\" id=\"ingredient1\"></div>");
		i = 1;
		o = 1;

		customDirectionsList.children().not('first').remove();
		customDirectionsList.append("<div class=\"input-group\" id=\"direction1group\"><span class=\"input-group-addon\" id=\"basic-addon2\">Step 1</span><input type=\"text\" class=\"form-control directionsInput\" placeholder=\"Step 1 goes here\" aria-describedby=\"bassic-addon2\" id=\"direction1\"></div>");

		$("#customRecipeTitle").val("");

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
