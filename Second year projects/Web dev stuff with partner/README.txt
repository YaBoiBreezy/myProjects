Report of Quality

Alex Breeze, 101 143 291
Dylan Hughes, 101 076 692


Instructions
------------------------------
Open a terminal/console/command-prompt on your machine
Change the working directory to this folder.
Run the command:  "npm install"
Run the command: "mongod --dbpath=database"

Open a second terminal and go to this folders directory again.
Run the command: "node database-initializer.js" to create and populate the database with all movies and people from the file movie-data-2500.json.
You will see the results of how many movies and people got entered in the database in the terminal.
Run the command: “node server.js” to start the server.


Open a browser and type in the URL at the top: “http://localhost:3000” and you will be able to access all functionality of the website locally.


Index of links
------------------------------
'/'						-> Home page
'/movies/:name'				-> Single movie page
'/movie/search/:input?page=number'		-> Search
'/movie' 					-> Add movie
'/users/:name'					-> Single user page
'/users/:name/allUsersFollowed'		}
'/users/:name/allPeopleFollowed'		} -> Expansion of this user’s data page
'/user/login'					-> Login to user account page
'/user/create_account'				-> Create user account page
'/people/:name'				-> Single person page
'/people/:name/allMoviesActed'		}
'/people/:name/allMoviesWritten'		} -> Expansion of this person’s data page
'/people/:name/allMoviesDirected'		}
'/person'					-> Create a person to database page



All server calls are organized into the appropriate categories of User, Movie and Person, allowing intuitive and extensible scaling. They are correctly labeled as get, post and patch. Whenever doing a function, we handled the err, and when finding docs we always checked if it was not found ([], or null). When finding data, we always used asynchronous calls with callbacks when possible or nested the next steps in callbacks.
When logged in, we stored the user’s username, so the site never needed to send account data (such as watched list) to the user on other pages besides their account page. Thus, logins,  logouts and loading other pages is faster. 
As far as I know, we met all submission requirements.
When searching for data we specified the desired data from the objects making database calls return faster with less data being unnecessarily sent to the server.
We also had proper status codes sent to any client request to let them know how the server responded to their request and to act accordingly.
All our notifications are links to the relevant movies, users and people (extra credit!) with a number beside the signout button indicating how many notifications you have(not shown if not logged in).
We tried to make the site scalable with screen size making images and other elements smaller accordingly.

Possible improvements: we could have separated our express.js server functions into Movie, User and Person into separate routers for better organization, but it doesn’t affect the actual functionality. Add https to secure our passwords when logging in. Encrypt saved passwords in the database under a user and likely move login credentials to a separate database.


Movie page similar movies algorithm:
Returns movies with at least one genre matching a genre in the movie whose page is currently being rendered. Generally speaking, the movie picture (clickbait) will be based on the genre, as will the actors, so using the genres alone should correspond with actors the user likes and the movie images the user will click on, as well as the genres the user is interested in. It does not repeat movies in the total recommended selection.


User page recommended movies algorithm: 
Goes through all user reviews, and formats lists of all genres in movies reviewed with higher than 5 rating. It then finds 10 movies by randomly picking a genre 5 times and searching this genre for 2 movies each. It does not repeat movies in the total recommended selection.
This generates movies similar to those the user liked with slight randomness to the recommended especially with a lot of reviews.  If the user reviews a lot of movies with a similar genre with rating above 5, these genres will be more likely to be picked in the selection as the user may be more likely to enjoy those types of movies. If a genre is picked for each selection, it is added to an array which gets searched every iteration to know if the movie search by genre has to skip over a certain number of movies so as to avoid repeating recommendations.

