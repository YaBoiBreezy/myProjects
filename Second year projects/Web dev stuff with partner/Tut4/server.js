
const http = require('http');
const fs = require("fs");

let items = ["Invest in meme stonks", "rig the election", "commit tax fraud","stop forest fires",
"Pick up the kids (Dont forget again)","por-wait, this isn't google.",
"how to delete history-wait, this still isn't google."];

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log(request.url);
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/todo.html"){
			//read the todo.html file and send it back
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
			});
		}else if(request.url === "/client.js"){
			//read todo.js file and send it back
			fs.readFile("client.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
			});
		//Add any more 'routes' and their handling code here
		//e.g., GET requests for "/list", POST request to "/list"
		}else if(request.url === "/list"){
            data = JSON.stringify(items);
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.write(data);
            response.end();
        }else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}else if(request.method === "PUT"){
		if(request.url === "/list"){
			let body = '';
			request.on('data', function(data){
				body += data;
			});
			request.on('end', function(){
				let data = JSON.parse(body);
				//console.log(data);
				let newItems = [];
				items.forEach(elem =>{
					if(!data.includes(elem)){
						newItems.push(elem);
					}
				});
				//console.log(newItems);
				items = newItems;
			});
			response.statusCode = 200;
			response.end();
		}else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}else if(request.method === "POST"){
		if(request.url === "/list"){	//This may not parse correctly using JSON.Parse! Check header on client request!
			let body = '';
			request.on('data', function(data){
				body += data;
			});
			request.on('end', function(){
				let postData = JSON.parse(body);
				function isDuplicate(itemName){
					for(let i = 0; i < items.length; i++){
						if(items[i] === itemName){
							return true;
						}
					}
					return false;
				}
				if(!isDuplicate(postData.name)){
					items.push(postData);
				}		
			});
			response.statusCode = 200;
			response.end();
		}else{
			//any handling in here
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');