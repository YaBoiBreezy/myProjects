
const mongoose = require('mongoose');
const Book = require("./BookModel");
const fs = require("fs");
const csv = require('csv-parser')
const results = []

mongoose.connect('mongodb://localhost/t9', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	mongoose.connection.db.dropDatabase(function(err, result){
		if(err){
			console.log("Error dropping database:");
			console.log(err);
			return;
		}
		console.log("Dropped T9 database. Starting re-creation.");

		let books = JSON.parse(fs.readFileSync("books.json"));
		books = books.filter(book => {return book.isbn.length == 10});
		let totalBooks = books.length;
		let finishedBooks = 0;
		let countFail = 0;
		let countSuccess = 0;
		books.forEach(book => {
			let b = new Book(book);
			b.save(function(err, callback){
				finishedBooks++;
				if(err){
					countFail++;
					console.log(err.message);
				}else{
					countSuccess++;
				}

				if(finishedBooks % 500 == 0){
					console.log("Finished book #" + finishedBooks + "/" + totalBooks);
				}
				if(finishedBooks == totalBooks){
					mongoose.connection.close();
					console.log("Finished.");
					console.log("Successfully added: " + countSuccess);
					console.log("Failed: " + countFail);
					process.exit(0);
				}
			});
		});
	});
});
