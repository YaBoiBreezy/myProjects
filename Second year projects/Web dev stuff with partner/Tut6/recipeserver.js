
//Database to store all recipe data
//This will give you 3 recipes to start with
let database = {
	"0":{
		"ingredients":
		[
			{"name":"Crab","unit":"Tsp","amount":3},
			{"name":"Peas","unit":"Cup","amount":12},
			{"name":"Basil","unit":"Tbsp","amount":10},
			{"name":"Cumin","unit":"Liter","amount":3},
			{"name":"Salt","unit":"Tbsp","amount":1}
		],

		"name":"Boiled Crab with Peas",
		"preptime":"13",
		"cooktime":"78",
		"description":"A boring recipe using Crab and Peas",
		"id":"0"
	},
	"1":{
		"ingredients":
		[
			{"name":"Peanuts","unit":"Liter","amount":10},
			{"name":"Artichoke","unit":"Tsp","amount":3},
			{"name":"Basil","unit":"Cup","amount":11},
			{"name":"Sage","unit":"Grams","amount":13},
			{"name":"Pepper","unit":"Cup","amount":1}
		],

		"name":"Boiled Peanuts with Artichoke",
		"preptime":"73",
		"cooktime":"74",
		"description":"A exciting recipe using Peanuts and Artichoke",
		"id":"1"
	},
	"2":{
		"ingredients":
		[
			{"name":"Lobster","unit":"Tsp","amount":14},
			{"name":"Brussel Sprouts","unit":"Liter","amount":14},
			{"name":"Sage","unit":"Tbsp","amount":3},
			{"name":"Thyme","unit":"Tbsp","amount":12},
			{"name":"Pepper","unit":"Tsp","amount":10},
			{"name":"Cumin","unit":"Tbsp","amount":11}
		],

		"name":"Spicy Lobster with Brussel Sprouts",
		"preptime":"86",
		"cooktime":"19",
		"description":"A tasty recipe using Lobster and Brussel Sprouts",
		"id":"2"
	}
}

const express = require('express');
let app = express();

app.use(express.static("public"));
//app.use('/recipes', express.static('public'));
app.use(express.json());
app.set('view engine', 'pug');

let id=3;
let recipes = {keys: []};
//Start adding route handlers here

app.get("/recipes", (req, res) =>{
	recipes = {keys: []};
	for (const [key, value] of Object.entries(database)){
		recipes.keys.push({id: key, name: value.name});
	}
	res.status(200).render('recipes.pug', recipes);
});

app.get("/recipes/:recipeID", (req, res) =>{
	if(database[req.params.recipeID] != undefined){
		res.status(200).render('singleRecipe.pug', database[req.params.recipeID]);
	}else{
		res.status(404).send("404 Recipe not found!");
	}
	
});

app.post('/recipes', (req, res) => {
    if(req.headers['content-type']==="application/json" && 
	  req.body.name[0] != ' ' && req.body.description[0] != ' ' &&
	  req.body.name[req.body.name.length-1] != ' ' && req.body.description[req.body.description.length-1] != ' '
	   && !isNaN(req.body.preptime) && !isNaN(req.body.cooktime) && req.body.name != ''
	   && req.body.preptime != '' && req.body.cooktime != '' && req.body.description != ''
	   && req.body.ingredients.length != 0 && req.body.preptime>=0 && req.body.cooktime>=0){
		database[id]=req.body;
		database[id].id=id;
		id++;
		//console.log(database[id-1]);
		res.status(201).end();
    }else{
		res.status(401).end();
	}
})

app.listen(3000);
console.log("Express server listening at http://localhost:3000");
