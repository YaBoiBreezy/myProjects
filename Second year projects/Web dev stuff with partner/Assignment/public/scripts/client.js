function search() {
    let searchText = document.getElementById('search');
    if (searchText.value != "")
        window.location.href = "/movie/search/" + searchText.value;
}

function login() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/user/login', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 302) {
            document.location = '/users/' + username;
        } else if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('Bad login. Please enter a valid username and password.');
            document.getElementById('password').value = '';
        }
    }
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let UserData = { 'username': username, 'password': password };
    xhttp.send(JSON.stringify(UserData)); //Send username and url here to the server!
}

function signup() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/users', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 302) { //Send user to personal page if successful
            document.location = xhttp.response['redirect'];
        } else if (xhttp.readyState == 4 && xhttp.status == 409) {
            alert('This username is already taken!');
        }
    }
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username == '' || password == '') {
        alert('Please enter a valid username and password.');
    } else {
        let UserData = { 'username': username, 'password': password };
        xhttp.send(JSON.stringify(UserData)); //Send username and url here to the server!
    }
}

function logout() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/user/logout', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 302) { //Send user to personal page if successful
            document.location = '/movies';
        } else if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('You are likely not signed in');
        }
    }
    xhttp.send(); //Send username and url here to the server!
}

function toggleWatched() {
    let location = window.location.pathname;
    location = location.slice(8);

    let xhttp = new XMLHttpRequest();
    xhttp.open('PATCH', '/movies/' + location + '/watched', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('You need to be signed in to do that');
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            let watchButton = document.getElementById('addWatchlist');
            if (watchButton.innerHTML == 'Remove from Watched') {
                watchButton.innerHTML = 'Add to Watched';
                alert('Movie removed from watched list');
            } else {
                watchButton.innerHTML = 'Remove from Watched';
                alert('Movie added to watched list');
            }
        }
    }
    xhttp.send();

}

function toggleFollow(type) {
    let identifier = window.location.pathname;
    let xhttp = new XMLHttpRequest();
    if (type == 'movie') {
        identifier = document.getElementById('movieTitle').innerHTML;
        xhttp.open('PATCH', '/movies/' + identifier + '/watched', true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 401) {
                alert(xhttp.responseText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
                if (xhttp.responseText == 'Watched movie!') {
                    document.getElementById('addWatchlist').innerHTML = 'Remove from Watched';
                } else {
                    document.getElementById('addWatchlist').innerHTML = 'Add to Watched';
                }
            }
        }
        xhttp.send();
    } else if (type == 'person') {
        identifier = identifier.slice(8);
        xhttp.open('PATCH', '/people/' + identifier + '/follow', true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 401) {
                alert(xhttp.responseText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
                if (xhttp.responseText == 'Person followed!') {
                    document.getElementById('followPerson').innerHTML = 'Unfollow';
                } else {
                    document.getElementById('followPerson').innerHTML = 'Follow';
                }
            }
        }
        xhttp.send();
    } else if (type == 'user') {
        identifier = identifier.slice(7);
        xhttp.open('PATCH', '/users/' + identifier + '/follow', true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 401) {
                alert(xhttp.responseText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
                if (xhttp.responseText == 'User followed!') {
                    document.getElementById('followPerson').innerHTML = 'Unfollow';
                } else {
                    document.getElementById('followPerson').innerHTML = 'Follow';
                }
            }
        }
        xhttp.send();
    }

}

function unfollow(url, name) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('PATCH', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert(xhttp.responseText);
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
            document.getElementById(name).remove();
        }
    }
    xhttp.send();
}

function addPerson() { //Add person to database from createPerson.pug page
    let name = document.getElementById('newPersonName').value;
    if (name == '') {
        return alert('Not a valid name!');
    }
    name = formatName(name);
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/people', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 409) {
            alert('Person already exists!');
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert('Person added to database successfully');
        }
    }
    xhttp.send(JSON.stringify({ 'name': name })); //Send new person name to the server!

}

function formatName(name) { //Mini function to format names to have capital letter first letter for each name part
    name = name.trim();
    let nameArray = name.split(' ');
    name = '';
    for (let i = 0; i < nameArray.length; i++) {
        nameArray[i] = nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1).toLowerCase(); //also makes rest of name lower-case
        name += nameArray[i] + ' ';
    }
    name = name.slice(0, name.length - 1);
    return name;
}

function addMovie() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/movies', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 302) {
            document.location = xhttp.response['redirect'];
        } else if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('You need to be logged in to do that!');
        }
    }
    //movie data
    let movieData = {};
    movieData['Title'] = document.getElementById('createTitle').value;
    movieData['Rated'] = document.getElementById('createRating').value;
    movieData['Released'] = document.getElementById('createReleaseDate').value;
    movieData['Runtime'] = document.getElementById('createRuntime').value;
    movieData['Plot'] = document.getElementById('createDisc').value;
    movieData['Poster'] = document.getElementById('createPoster').value;

    //Set genre in createMovie.pug page!!!!
    movieData['Genre'] = document.getElementById('createReleaseDate').value;
    movieData['Actors'] = [];
    movieData['Writers'] = [];
    movieData['Directors'] = [];
    movieData['Genres'] = [];
    let actors = document.getElementById('actors').children;
    for (let i = 0; i < actors.length; i++) {
        movieData['Actors'].push(actors[i].innerHTML);
    }
    let writers = document.getElementById('writers').children;
    for (let i = 0; i < writers.length; i++) {
        movieData['Writers'].push(writers[i].innerHTML);
    }
    let directors = document.getElementById('directors').children;
    for (let i = 0; i < directors.length; i++) {
        movieData['Directors'].push(directors[i].innerHTML);
    }
    let genres = document.getElementById('genres').children;
    for (let i = 0; i < genres.length; i++) {
        movieData['Genres'].push(genres[i].innerHTML);
    }
    if (movieData['Title'] == '' || movieData['Rated'] == '' || movieData['Released'] == '' ||
        movieData['Runtime'] == '' || movieData['Plot'] == '' || movieData['Poster'] == '' ||
        movieData['Actors'] == [] || movieData['Writers'] == [] || movieData['Directors'] == [] || movieData['Genres'] == []) {

        alert('You need to enter data in all fields!');
    } else {
        xhttp.send(JSON.stringify({ movie: movieData }));
    }
}

function addGenreToList() {
    let genre = document.getElementById('createGenre').value;
    let curGenres = document.getElementById('genres').childNodes;
    let add = true;
    for (i in curGenres) {
        if (curGenres[i].innerHTML == genre) {
            add = false;
            break;
        }
    }
    if (add) {
        let node = document.createElement('p');
        let textNode = document.createTextNode(genre);
        node.appendChild(textNode);
        document.getElementById('genres').appendChild(node);
    }
}

function person_find(createString, foundString) { //For createMovie.pug page. Populates person dropdown list by looking up names in db and adding options.
    let actorName = document.getElementById(createString).value;

    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/movie/people_finder', true);
    xhttp.responseType = "json";
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let selectList = document.getElementById(foundString);
            let sampleNode = document.createElement('option');
            let sampleText = document.createTextNode('Select a person');
            sampleNode.appendChild(sampleText);
            while (selectList.hasChildNodes()) {
                selectList.removeChild(selectList.firstChild);
            }
            selectList.appendChild(sampleNode);
            for (actor in xhttp.response) {
                let node = document.createElement('option');
                let textNode = document.createTextNode(xhttp.response[actor].name);
                node.appendChild(textNode);
                selectList.appendChild(node);
            }
        }
    }
    xhttp.send(JSON.stringify({ 'name': actorName }));
}

function addPersonToList(destination, personLocation) { //Adds selected person from personLocation dropdown into destination div as a 'p' element.
    let dest = document.getElementById(destination);
    let lookup = document.getElementById(personLocation);
    let person = lookup.options[lookup.selectedIndex].text;
    if (person != 'Select a person') {
        let node = document.createElement('p');
        let textNode = document.createTextNode(person);
        node.appendChild(textNode);
        let add = true;
        for (i in dest.childNodes) { //Checking if person already in div. If true, don't re-add them to div.
            if (dest.childNodes[i].innerHTML == person) {
                add = false;
                break;
            }
        }
        if (add) {
            dest.appendChild(node);
        }
    }
}

function createThing(location) { //On personal page for creating movie/ creating actor.
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', location, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert(xhttp.responseText);
        } else if (xhttp.readyState == 4 && xhttp.status == 302) {
            document.location = location;
        }
    }
    xhttp.send();
}

function toggleContributing() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('PATCH', '/user/contributing', true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
            if (xhttp.responseText == 'You are now a contributing user') {
                document.getElementById('contributorOn').innerHTML = 'Contributor mode off';
            } else {
                document.getElementById('contributorOn').innerHTML = 'Contributor mode on';
            }
        } else if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert(xhttp.responseText);
        }
    }
    xhttp.send();
}

function addReview() {
    let id = window.location.pathname;
    id = id.slice(8);
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/movies/' + id + '/reviews', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('You need to be logged in to do that!');
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            //add review to page.
            loadReviews([xhttp.response['location']], 'movie');
        }
    }
    let reviewData = {};
    reviewData['rating'] = document.getElementById('reviewRating').value;
    reviewData['shortRev'] = document.getElementById('reviewTitle').value;
    reviewData['longRev'] = document.getElementById('reviewBody').value;
    if (reviewData['rating'] == '' || reviewData['rating'] < 0 ||
        reviewData['rating'] > 10 || (reviewData['shortRev'] == '' && reviewData['longRev'] != '')
        || (reviewData['shortRev'] != '' && reviewData['longRev'] == '')) {
        alert('Not a valid review!');
    } else {
        if (reviewData['shortRev'] == '') reviewData['shortRev'] += ' ';
        if (reviewData['longRev'] == '') reviewData['longRev'] += ' ';
        xhttp.send(JSON.stringify(reviewData));
    }
}

function loadReviews(ids, type) { //ids as an array so when loading the page you can send all ids stored in a movie.
    let dest = document.getElementById('reviews');
    if (ids.length == 0) {
        let node = document.createElement('p');
        node.appendChild(document.createTextNode('No reviews written!'));
        dest.appendChild(node);
        dest.setAttribute('style', 'display:block');
    } else {
        if (dest.firstChild != null && dest.firstChild.innerHTML == 'No reviews written!') {
            dest.removeChild(dest.firstChild);
        }
        let style = '';
        if(ids.length == 1) {
            dest.setAttribute('style', 'display:block');
            style = 'display:block; margin:auto; width:50%';
        } else {
            dest.setAttribute('style', 'display:grid');
            style = 'display:inline';
        }
        ids.forEach((id) => {
            let xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/movie/review_finder', true);
            xhttp.responseType = 'json';
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let span = document.createElement('SPAN');
                    span.setAttribute('id', 'reviewedSpan');
                    span.setAttribute('style', style);
                    let link = document.createElement('a');
                    link.setAttribute('id', 'reviewedShort');
                    if (type == 'movie') {
                        link.setAttribute('href', '/users/' + xhttp.response['user']);
                        link.appendChild(document.createTextNode(xhttp.response['user']));
                    } else {
                        link.setAttribute('href', '/movies/' + xhttp.response['movie']['id']);
                        link.appendChild(document.createTextNode(xhttp.response['movie']['Title']));
                    }
                    let title = document.createElement('p');
                    title.setAttribute('id', 'reviewedShort');
                    title.appendChild(document.createTextNode(xhttp.response['small']));
                    let body = document.createElement('p');
                    body.appendChild(document.createTextNode(xhttp.response['big']));
                    let rating = document.createElement('p');
                    rating.setAttribute('id', 'reviewedShort');
                    if (xhttp.response['small'] == ' ') {
                        rating.appendChild(document.createTextNode(': ' + xhttp.response['rating']));
                    } else {
                        rating.appendChild(document.createTextNode(': ' + xhttp.response['rating'] + ', '));
                    }
                    span.appendChild(link);
                    span.appendChild(rating);
                    span.appendChild(title);
                    span.appendChild(body);
                    dest.appendChild(span);
                } else if (xhttp.readyState == 4 && xhttp.status == 404) {
                    console.log('Movie of id:' + id + ' not found with /movie/review_finder.');
                }
            }
            xhttp.send(JSON.stringify({ 'id': id }));
        });
    }
}


function getIds(movieTitles, divID) {
    if (movieTitles.length == 0) {
        let div = document.getElementById(divID);
        if (div != null) {    //Only null on a person.pug page where acted/wrote/directed sections will not be created.
            div.removeChild(div.firstChild);
            let node = document.createElement('p');     //Otherwise, this is a user page for watched list.
            let textNode = document.createTextNode("No watched movies!");
            node.appendChild(textNode);
            div.appendChild(node);
        }
    } else {
        let divDest = document.getElementById(divID);
        divDest.removeChild(divDest.firstChild);
        movieTitles.forEach((title) => {
            let xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/movie/movie_finder', true);
            xhttp.responseType = 'json';
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let node = document.createElement('a');
                    node.setAttribute('href', '/movies/' + xhttp.response['Id']);
                    let img = document.createElement('IMG');
                    img.setAttribute('src', xhttp.response['Poster']);
                    img.setAttribute('title', title);
                    img.setAttribute('class', 'home');
                    node.appendChild(img);
                    let div = document.createElement('DIV');
                    div.setAttribute('id', 'homeMovie');
                    div.appendChild(node);
                    divDest.appendChild(div);
                } else if (xhttp.readyState == 4 && xhttp.status == 404) {
                    console.log('Movie of title:' + title + ' could not be found in /movie/movie_finder');
                }
            }
            xhttp.send(JSON.stringify({ title: title }));
        });
    }
}

function drawWatched(movies) {
    let div = document.getElementById('moviesWatched');
    div.removeChild(div.firstChild);
    if (movies.length == 0) {
        let node = document.createElement('p');     //Otherwise, this is a user page for watched list.
        let textNode = document.createTextNode("No watched movies!");
        node.appendChild(textNode);
        div.appendChild(node);
    } else {
        movies.forEach((id) => {
            let xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/movie/poster_finder', true);
            xhttp.responseType = 'json';
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let span = document.createElement('div');
                    span.setAttribute('id', id + '~');
                    span.setAttribute('style', 'display:inline-block; width:16%; height:100%');
                    let link = document.createElement('a');
                    link.setAttribute('id', id);
                    link.setAttribute('href', '/movies/' + id);
                    let unwatchBut = document.createElement('BUTTON');
                    unwatchBut.setAttribute('id', id);
                    //unwatchBut.setAttribute('style', 'margin:50%');
                    unwatchBut.innerHTML = 'Unwatch';
                    unwatchBut.setAttribute('onclick', 'unfollow("/movies/' + id + '/watched", "' + id + '~")')
                    let img = document.createElement('img');
                    img.setAttribute('src', xhttp.response['Poster']);
                    img.setAttribute('style', 'width:90%');
                    link.appendChild(img);
                    span.appendChild(link);
                    span.appendChild(document.createElement('br'));
                    span.appendChild(unwatchBut);
                    div.appendChild(span);
                } else if (xhttp.readyState == 4 && xhttp.status == 404) {
                    console.log('Movie of id:' + id + ' could not be found in /movie/poster_finder');
                }
            }
            xhttp.send(JSON.stringify({ id: id }));
        });
    }
}

function loadNotifications(notifications) {
    let dest = document.getElementById('notifications');
    if (notifications.length == 0) {
        let none = document.createElement('p');
        none.appendChild(document.createTextNode('No notifications'));
        dest.appendChild(none);
        dest.setAttribute('style', 'display:block');
    } else {
        let index = 0;
        if (notifications.length == 1) {
            dest.setAttribute('style', 'display:block');
        } else {
            dest.setAttribute('style', 'display:grid');
        }
        notifications.forEach(function (noti) {
            let span = document.createElement('SPAN');
            span.setAttribute('id', 'reviewedSpan');
            let person = document.createElement('a');
            person.setAttribute('id', 'reviewedShort');
            if (noti.Type == 'movie') {
                person.setAttribute('href', '/people/' + noti.name);
                person.appendChild(document.createTextNode(not.name));
            } else {
                person.setAttribute('href', '/users/' + noti.name);
                person.appendChild(document.createTextNode(noti.name));
            }
            let text = document.createElement('p');
            text.setAttribute('id', 'reviewedShort');
            text.appendChild(document.createTextNode(noti.text));
            let movie = document.createElement('a');
            movie.setAttribute('id', 'reviewedShort');
            movie.appendChild(document.createTextNode(noti.movieTitle));
            movie.setAttribute('href', '/movies/' + noti.movieId);
            let removeNoti = document.createElement('BUTTON');
            removeNoti.innerHTML = 'Mark as seen';
            removeNoti.setAttribute('onclick', 'removeNotification(' + index + ')');
            span.appendChild(person);
            span.appendChild(text);
            span.appendChild(movie);
            span.appendChild(removeNoti);
            dest.appendChild(span);
            index++;
        });
    }
}

function removeNotification(index) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('PATCH', '/user/notifications', true);
    xhttp.responseType = 'json';
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let dest = document.getElementById('notifications');
            while (dest.hasChildNodes && dest.firstChild != null) {
                dest.removeChild(dest.firstChild);
            }
            loadNotifications(xhttp.response);
        } else if (xhttp.readyState == 4 && xhttp.status == 401) {
            alert('You need to be logged in to do that!');
        }
    }
    xhttp.send(JSON.stringify({ index: index }));
}

function nextPage() {
    let queries = (new URL(document.location)).searchParams;
    let count = queries.get('page');
    if (count != undefined) {
        count = parseInt(count, 10);
        count++;
    } else {
        count = 1;
    }
    window.location = window.location.pathname + '?page=' + count;
}

function prevPage() {
    let queries = (new URL(document.location)).searchParams;
    let count = queries.get('page');
    if (count != undefined && count > 0) {
        count = parseInt(count, 10);
        count--;
    } else {
        count = 0;
    }
    window.location = window.location.pathname + '?page=' + count;
}