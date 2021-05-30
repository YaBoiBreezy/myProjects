/* 

In this versions, we contain all of the list information
in an array of objects. A renderList() function is defined.
This goes through the array and generates new HTML elements
to match the state of the objects in the array.
User interactions cause changes in the object state.
Render function is called whenever a change is made.
This is a nice design when involving a server, as it allows
the list data to easily be stringified and transmitted.
	
*/

//const { listenerCount } = require("process");

let highlightColor = "yellow";

//The array to store all items in the list
let items = [];

function poll(){
	//console.log("Poll called!");
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/list", true);
	xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status==200) {
			let data = JSON.parse(xhttp.responseText);
			let newItems = [];
			items.forEach((elem)=>{
				index = data.indexOf(elem.name);
				if(index > -1){
					newItems.push(elem);
					data.splice(index, 1);
				}
			});
	
			data.forEach((elem)=>{
				newItems.push({name: elem, light: false, checked: false});
			});
			items = newItems;
			renderList(); //call function to fill in the list div
		}
    }
	xhttp.send();
}


function init(){
	//Initialize the event handlers
	poll();
	setInterval(poll,5000);

	/*
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/list", true);
	xhttp.onload=function(){
        if(xhttp.status==200) {
			let data = JSON.parse(xhttp.responseText);
			data.forEach((elem)=>{
				items.push({name: elem, light: false, checked:false});
			});

		}
		renderList(); //call function to fill in the list div
    }
	xhttp.send();
	*/


	document.getElementById("additem").addEventListener("click", addItem);
	document.getElementById("removeitem").addEventListener("click", removeItem);
	document.getElementById("highlight").addEventListener("click", highlightItems);
	document.getElementById("sort").addEventListener("click", sortItems);
	

}

//Returns true if an item with that name exists
function isDuplicate(itemName){
	for(let i = 0; i < items.length; i++){
		if(items[i].name === itemName){
			return true;
		}
	}
	return false;
}

function addItem(){
	//Verify an item name was entered
	let itemName = document.getElementById("itemname").value;
	if(itemName.length == 0){
		alert("You must enter an item name.");
		return;
	}

	//If it is not a duplicate
	if(!isDuplicate(itemName)){
		let xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/list", true);
		xhttp.setRequestHeader('Content-Type', 'application/json');

		xhttp.onreadystatechange = function() {
			if(xhttp.readyState == 4){
				if(xhttp.status==200) {
					items.push({name: itemName, light: false, checked: false});
					renderList();
					//console.log(items);
				}else{
					alert("Bad request, try again.");
				}
			}
		}
		xhttp.send(JSON.stringify(itemName));
	}else{
		alert("Duplicate item names not allowed.");
	}
}

//Removes selected items
//Strategy is actually to build a new array of items to keep
//Then re-assign the items array to this new array
function removeItem(){
	let xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "/list", true);
	xhttp.setRequestHeader('Content-Type', 'application/json');

	let remItems = [];
	let newItems = [];
	items.forEach(elem =>{
		//If an item isn't checked, we want to keep it
		if(!elem.checked){
			newItems.push(elem);
		}else{
			remItems.push(elem.name);
		}
	});
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4){
			if(xhttp.status==200) {
				items = newItems;
				renderList();
			}else{
				alert("Bad request, try again.");
			}
		}
	}
	xhttp.send(JSON.stringify(remItems));
}

//Toggles highlight of selected items
function highlightItems(){
	items.forEach(elem =>{
		//If the item is checked, toggle its light property
		if(elem.checked){
			elem.light = !elem.light;
		}
	});
	renderList();
}

//Sort the array, render the list again
function sortItems(){
	items.sort(function(a,b){
		if(a.name < b.name){
			return -1;
		}else if(a.name > b.name){
			return 1;
		}else{
			return 0;
		}
	})
	renderList();
}

function toggleCheck(){
	//'this' refers to the calling object
	//In this case, the checkbox that was clicked
	//We saved the 'value' property with the item name
	let itemName = this.value;
	items.forEach(elem => {
		if(elem.name === itemName){
			elem.checked = !elem.checked;
			renderList();
			return;
		}
	});
}

//Creates new items list HTML and replaces the old HTML
function renderList(){
	let highlightColor = "yellow";
	
	//Create a new div to hold the list
	//This will replace the old one
	let newList = document.createElement("div");
	newList.id = "list";
	
	//For each item in the array of items
	items.forEach(elem => {
		//Create a new div to be child of 'list' div
		//Set highlighting based on property of item
		let newDiv = document.createElement("div");
		if(elem.light){
			newDiv.style.backgroundColor = highlightColor
		}
		
		//Create and add the new checkbox
		let newItem = document.createElement("input");
		newItem.type = "checkbox";
		newItem.value = elem.name;
		newItem.id = elem.name;
		newItem.checked = elem.checked
		newItem.onclick = toggleCheck;
		newDiv.appendChild(newItem);
	
		//Create and add the new text node (the item name)
		let text = document.createTextNode(elem.name);
		newDiv.appendChild(text);
	
		//Add newly created div to children of list div
		newList.appendChild(newDiv);
	});
	
	let origList = document.getElementById("list");
	origList.parentNode.replaceChild(newList, origList);
}