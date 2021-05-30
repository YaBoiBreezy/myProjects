//Create express app
const express = require('express');
let app = express();

//Database variables
let mongo = require('mongodb');
let async = require('async');
let MongoClient = mongo.MongoClient;
let db;

//View engine
app.set("view engine", "pug");

//Set up the routes
app.use(express.static("public"));
app.get("/", sendIndex);
app.get("/cards/:cardID", sendCard);
app.get("/cards", express.json(), findSendCards);



function findSendCards(req,res,next){
	let queries = [];
	if(req.query.minAttack != '' && parseInt(req.query.minAttack) != NaN){
		queries.push({attack: {$gte: parseInt(req.query.minAttack)}});
	}
	if(req.query.maxAttack != '' && parseInt(req.query.maxAttack) != NaN){
		queries.push({attack: {$lte: parseInt(req.query.maxAttack)}});
	}
	if(req.query.minHealth != '' && parseInt(req.query.minHealth) != NaN){
		queries.push({health: {$gte: parseInt(req.query.minHealth)}});
	}
	if(req.query.maxHealth != '' && parseInt(req.query.maxHealth) != NaN){
		queries.push({health: {$lte: parseInt(req.query.maxHealth)}});
	}
	if(req.query.name != ''){
		queries.push({name: {$regex: req.query.name}});	//Use $regex to find string
	}
	if(req.query.artist != ''){
		queries.push({artist: {$regex: req.query.artist}});	
	}
	if(req.query.class != ''){ //Not needed as always included but it's a defensive practice imo
		queries.push({cardClass: req.query.class});
	}
	if(req.query.rarity != ''){ //Not needed as always included but it's a defensive practice imo
		queries.push({rarity: req.query.rarity});
	}

	db.collection("cards").find({$and: queries}).toArray(function(err, results){
		res.setHeader('content-type', 'text/html');
		res.status(200).render('cardMatch.pug', {cards: results});
	});

}

function sendIndex(req, res, next){
	async.parallel([
		function(callback){
			db.collection("cards").distinct("cardClass", callback);
		},
		function(callback){
			db.collection("cards").distinct("rarity", callback);
		}
	], 
	function(err, results){
		if(err) throw err;
		res.render("index", {classes: results[0], rarities: results[1]});
	});
	
}

function sendCard(req, res, next){
	let oid;
	try{
		oid = new mongo.ObjectID(req.params.cardID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}

	db.collection("cards").findOne({"_id":oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("Unknown ID");
			return;
		}
		res.status(200).render("card", result);
	});
}

// Initialize database connection
MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true}, function(err, client) {
  if(err) throw err;

  //Get the t8 database
  db = client.db('t8');

  // Start server once Mongo is initialized
  app.listen(3000);
  console.log("Express server listening on port 3000, MongoDB listening on 27017");
});
