const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = Schema({
	title: {type: String, required: true},
	authors: {type: String, required: true},
	isbn: {type: String, required: true, validate: isbnValidate},
	ratings: [Number]
});

function isbnValidate(isbn){
	if(isbn.length == 10 && !isNaN(isbn.substring(0, 9)) &&
	 (!isNaN(isbn.charAt(9)) || isbn.charAt(9) == 'X')){
		let char9 = 0;
		if(!isNaN(isbn.charAt(9))){
			char9 = Number.parseInt(isbn.charAt(9));
		}else{
			char9 = 10;
		}
		if((((Number.parseInt(isbn.charAt(0))*10)+
		 (Number.parseInt(isbn.charAt(1))*9) + (Number.parseInt(isbn.charAt(2))*8) +
		 (Number.parseInt(isbn.charAt(3))*7) + (Number.parseInt(isbn.charAt(4))*6) +  
		 (Number.parseInt(isbn.charAt(5))*5) + (Number.parseInt(isbn.charAt(6))*4) +
		 (Number.parseInt(isbn.charAt(7))*3) + (Number.parseInt(isbn.charAt(8))*2) + char9)%11==0)){
			return true;
		}
	 }
	 return false;
}

module.exports = mongoose.model("Book", bookSchema);