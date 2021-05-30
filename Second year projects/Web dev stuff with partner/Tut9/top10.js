const mongoose = require("mongoose");
const Book = require('./BookModel');

function getTopBooks(){
	let topRat=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let topBook=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Book.find({$where: 'this.ratings.length > 10'}, function (err, docs) {
		if(err){
			console.error("Failed to find books with > 10 ratings:",err);
			return;
		}
		let book;
		for(book in docs){
			let sum=0;
			let i;
			for(i in docs[book].ratings){
				sum+=docs[book].ratings[i];
			}
			if(sum > 0){
				sum/=docs[book].ratings.length;
			}
			if(sum > topRat[9]){
                let x = 8;
                while(x > -2){
                    if(x==-1 || sum<topRat[x]){
                        topRat.splice(x+1,0,sum);
                        topBook.splice(x+1,0,docs[book].title);
                        topBook.pop();
                        topRat.pop();
                        break;
                    }
                    x--;
               }
            }
		}
		console.log('Logging top rated movies with more than 10 reviews..');
		let y;
		for(y=0; y<10; y++){
			console.log(y+1+'. '+topBook[y] + ' - ' + topRat[y]);
		}
	});
}


mongoose.connect('mongodb://localhost/t9', {useNewUrlParser: true, useUnifiedTopology: true}).then(
	() => {
		console.log('Mongoose client connected to MongoDB on 27017');
		getTopBooks();
	},
	err => {
		console.log("Mongoose failed to connect to the database.");
	}
);