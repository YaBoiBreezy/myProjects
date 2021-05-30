
/*
Card source: https://api.hearthstonejson.com/v1/25770/enUS/cards.json

Each card is a JS object
All have:
	id - string uniquely identifies the card
	artist - string indicating the name of the artist for the cards image
	cardClass - string indicating the class of the card
	set  - string indicating the set the card is from
	type - string indicating the type of the card
	text - string indicating card text
Some have:
	rarity - string indicating the rarity of the card
	mechanics - array of string indicating special mechanics
	
Routes:
	/cards - search all cards (query params: class, set, type, artist)
	/cards/:cardID - specific card with ID=:cardID
*/

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.use('/', express.static('/views'));
app.use('/cards', express.static('public'));

//Set up the required data
let cardData = require("./cards.json");
let cards = {}; //Stores all of the cards, key=id
let indexCards = {};
let x=1;
cardData.forEach(card => {
    cards[card.id] = card;
    indexCards["card"+x] = card;
    x++;
});

let filteredCard = [];
let filteredToObject = {};

app.get('/cards/:cardID', (req, res) => { //part 2, card id search
	if (cards.hasOwnProperty(req.params.cardID)){
		res.status(200).render('cardView', cards[req.params.cardID]);
	} else{
		res.status(404).send("404: Card not found!");
	}
})


/*Query params: (Both are not combinable at the moment)
 *page:int   -> On the home page displays certain page starting at 1.
 *name:string -> Displays close matches to string
 *
 *none -> Displays main first page of 20 cards
*/

app.get('/cards/', (req, res) => {
    if(req.query.name!=undefined){ //part 3, query by name
		tempCards = cardData.filter(card => card.name.includes(req.query.name));
		let cardIndex = 1;
		tempCards.forEach(card => {
			filteredToObject["card"+cardIndex] = card;
			cardIndex++;
		});
        res.status(200).render('cards', filteredToObject);

	} else if(req.query.page!=undefined){ //part 1, load other pages
		filteredToObject = {};
		if(!isNaN(req.query.page) && req.query.page>0){
			let index = 1+((req.query.page-1)*20);
			let y = 1;
			while(index<=x && y<21){
				filteredToObject["card"+y] = indexCards["card"+index];
				y++;
				index++;
			}
		}
        res.status(200).render('cards', filteredToObject);
    } else{ //part 1, load main page. Equivilent to ?page=1
        res.status(200).render('cards', indexCards);
    }
})

app.get('/', (req, res) => {
	res.redirect("/cards");
})
app.listen(port);
console.log("Express server listening at http://localhost:3000");