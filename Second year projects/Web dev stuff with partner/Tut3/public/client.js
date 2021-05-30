let reviewsArray=[];

function searchMovie(){//button=search, text=movie-key
    let xhttp = new XMLHttpRequest();
    console.log(document.getElementById('movie-key').value);
    console.log("http://www.omdbapi.com/?i="+document.getElementById('movie-key').value+"&apikey=5d65cb51");
    xhttp.open("GET", "http://www.omdbapi.com/?i="+document.getElementById('movie-key').value+"&apikey=5d65cb51", true);
    xhttp.send();
    document.getElementById("movie-key").value = "";
    xhttp.onload=function(){
        if(xhttp.status==200) {
            let movieData=JSON.parse(xhttp.responseText);
            if(movieData.Response === "True"){
                reviewsArray=[];
                displayUserReviews();
                document.getElementById('poster').src = movieData.Poster;
                document.getElementById('title').innerHTML = "Title: " + movieData.Title;
                document.getElementById('runtime').innerHTML = "Runtime: " + movieData.Runtime;
                document.getElementById('rel-year').innerHTML = "Release Year: " + movieData.Year;
                document.getElementById('actors').innerHTML = "Actors: " + movieData.Actors;
                document.getElementById('poster').style.visibility = "visible";
                document.getElementById('title').style.visibility = "visible";
                document.getElementById('runtime').style.visibility = "visible";
                document.getElementById('rel-year').style.visibility = "visible";
                document.getElementById('actors').style.visibility = "visible";
                document.getElementById('cur-reviews').style.visibility = "visible";
    
                let displayed = document.getElementById("cur-reviews");
                while(displayed.hasChildNodes()){
                        displayed.removeChild(displayed.firstChild);
                }

                node = document.createElement("P");
                textnode = document.createTextNode("Ratings");
                node.append(textnode);
                displayed.appendChild(node);

                movieData.Ratings.forEach(reviews);
                function reviews(value, index, array){
                    node = document.createElement("P");
                    textnode = document.createTextNode(value.Source +": "+value.Value);
                    node.append(textnode);
                    displayed.appendChild(node);
                }
            } else{
                alert("ERROR: Movie not found.");
            }
        }
        else {
            alert("ERROR: Bad Request");
        }
    }
}
//
function addNewReview(){
    if(isNaN(document.getElementById('movie-score').value) || Number(document.getElementById('movie-score').value)<0
     || Number(document.getElementById('movie-score').value)>10){
        alert("ERROR: INVALID SCORE. MUST BE BETWEEN 0 AND 10");
        document.getElementById('movie-score').value="";
    }
    else if (document.getElementById('user-name').value==""){
        alert("ERROR: INVALID NAME");
    }
    else if (document.getElementById('review-text').value==""){
        alert("ERROR: INVALID REVIEW");
    }
    else{
        printAllReviews();
    }
}

function printAllReviews(){
    
    let node = document.createElement("P");
    let textnode = document.createTextNode("User: " + document.getElementById("user-name").value + "\nRating: "
         + document.getElementById("movie-score").value + "\nReview: " + document.getElementById("review-text").value);
    node.append(textnode);
    reviewsArray.push(node);
    document.getElementById('movie-score').value="";
    document.getElementById('user-name').value="";
    document.getElementById('review-text').value="";
    displayUserReviews();
}

function displayUserReviews(){
    let displayed = document.getElementById("user-reviews");
    while (displayed.hasChildNodes()){
        displayed.removeChild(displayed.firstChild);
    }

    reviewsArray.forEach(lsReview);
    function lsReview(elem, index, array){
        displayed.appendChild(elem);
    }

}