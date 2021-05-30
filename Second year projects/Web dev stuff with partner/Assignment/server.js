
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const mongoose = require('mongoose');
const async = require('async')
const movieData = require('./movieData/movie-data-10.json');
const Models = require('./public/scripts/mongooseModels.js');
let Movie = Models.Movie;
let User = Models.User;
let Person = Models.Person;
let Review = Models.Review;
const PORT = 3000;
const app = express();
const path = __dirname + '/public';

let mongoDB = 'mongodb://127.0.0.1/database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'pug');
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: false }));

let movieDB = {}
let movieHome = {};

let id = 1;
movieData.forEach(movie => {
	movieDB[movie.Title] = movie;
	if (id < 11) {
		movieHome['MovieData' + id] = movie;
		id++;
	}
});

app.get('(/|/movies)', (req, res) => {
	Movie.find({}, function (err, docs) {
		if (err) { throw err; }
		res.set('Content-Type', 'text/html');
		if (req.session.hasOwnProperty('username')) {
			User.findOne({ username: req.session.username }, async function (userErr, user) {
				if (userErr) { throw userErr; }
				if (user.reviews.length != 0) {
					let ReccData = await getRecommended(user.reviews); //at bottom of page. Based on review rating >5, get all genres of said movie then pick random genres and make a list.
					res.status(200).render('home.pug', { MovieData: docs, ReccData: ReccData, username: req.session.username, notification: user.notifications.length });
				} else {
					res.status(200).render('home.pug', { MovieData: docs, username: req.session.username, notification: user.notifications.length });
				}
			}).select('reviews notifications');
		} else {
			res.status(200).render('home.pug', { MovieData: docs, username: req.session.username });
		}
	}).limit(10).select('_id Poster');
});

app.get('/movies/:id', (req, res) => {
	Movie.findOne({ _id: req.params.id }, async function (err, movieDoc) {
		if (err) { res.status(500).send(err); }
		else if (movieDoc == null) {
			res.status(404).send('Movie not found!');
		} else {
			res.set('Content-Type', 'text/html');
			let similar = await getSimilarMovies(movieDoc.Genres, movieDoc._id);
			if (req.session.hasOwnProperty('username')) {//sends movieData, watched, recommendedMovies   (I dont have movie recommender algorithm yet)
				User.findOne({ username: req.session.username }, function (userError, userDoc) {
					if (userError) { throw userError; }
					res.status(200).render('movie.pug', { MovieData: movieDoc, Watched: userDoc.moviesWatched.includes(movieDoc._id), similar: similar, username: req.session.username, notification: userDoc.notifications.length });
				}).select('moviesWatched notifications');
			}
			else {//if not logged in, watched=false
				if (err) { throw err; }
				//console.log(docs);
				res.status(200).render('movie.pug', { MovieData: movieDoc, Watched: false, similar: similar, username: req.session.username });
			}
		}
	});
});

app.get('/movie/search/:input', (req, res) => {
	async.parallel([
		function (callback) {
			Movie.find({ $text: { $search: req.params.input } }, callback).skip(10 * (req.query.page)).limit(10).select('_id Poster');
		}, function (callback) {
			Person.find({ $text: { $search: req.params.input } }, callback).skip(12 * (req.query.page)).limit(12).select('name');
		}
	], function (err, docs) {
		if (err) { throw err; }
		//console.log(docs[0]);
		res.set('Content-Type', 'text/html');
		if (req.session.hasOwnProperty('username')) {
			User.findOne({ username: req.session.username }, function (error, user) {
				res.status(200).render('search.pug', { MovieData: docs[0], People: docs[1], username: req.session.username, notification: user.notifications.length });
			}).select('notifications');
		} else {
			res.status(200).render('search.pug', { MovieData: docs[0], People: docs[1], username: req.session.username });
		}
	});
});

app.get('/movie', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; }
			if (user.contributingUser) {
				res.set('Content-Type', 'text/html');
				res.status(302).render('createMovie.pug', { username: req.session.username, notification: user.notifications.length });
			} else {
				res.status(401).send('You are not a contributing user!');
			}
		}).select('contributingUser notifications');
	} else {
		res.status(401).send('You are not logged in!');
	}
});

app.get('/users/:name', (req, res) => { //Singular other user page
	User.findOne({ username: req.params.name }, {}, async function (err, docs) {
		if (err) { res.status(500).send('Error searching database.'); }
		if (docs == null) {
			res.status(404).send('User not found!');
		} else {
			res.set('Content-Type', 'text/html');
			if (req.session.hasOwnProperty('username')) {
				if (req.session.username == req.params.name) {
					if (docs.reviews.length != 0) {
						let ReccData = await getRecommended(docs.reviews);
						res.status(200).render('userSelf.pug', { UserData: docs, ReccData: ReccData, username: req.session.username, notification: docs.notifications.length });
					} else {
						res.status(200).render('userSelf.pug', { UserData: docs, username: req.session.username, notification: docs.notifications.length });
					}
				}
				else {
					User.findOne({ username: req.session.username }, function (error, followed) {
						if (error) { throw error; }
						if (followed.usersFollowed.includes(req.params.name)) {
							docs.followed = true;
							res.status(200).render('user.pug', { UserData: docs, username: req.session.username, notification: followed.notifications.length });
						} else {
							docs.followed = false;
							res.status(200).render('user.pug', { UserData: docs, username: req.session.username, notification: followed.notifications.length });
						}

					}).select('usersFollowed notifications');
				}
			} else {
				res.status(200).render('user.pug', { UserData: docs, username: req.session.username });
			}
		}
	});
});

app.get('/users/:name/allUsersFollowed', (req, res) => { //Singular other user page
	User.findOne({ username: req.params.name }, function (err, userFound) {
		if (err) { throw err; }
		if (userFound == null) {
			res.status(404).send('User not found!');
		} else {
			res.set('Content-Type', 'text/html');
			res.status(200).render('listAll.pug', { dataType: 'Users Followed', dataLink: '/users/', dataList: userFound.usersFollowed, username: req.session.username });
		}
	}).select('usersFollowed');
});

app.get('/users/:name/allPeopleFollowed', (req, res) => { //Singular other user page
	User.findOne({ username: req.params.name }, function (err, userFound) {
		if (err) { throw err; }
		if (userFound == null) {
			res.status(404).send('User not found!');
		} else {
			res.set('Content-Type', 'text/html');
			res.status(200).render('listAll.pug', { dataType: 'People Followed', dataLink: '/people/', dataList: userFound.peopleFollowed, username: req.session.username });
		}
	}).select('peopleFollowed');
});

app.get('/user/login', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).render('login.pug', { username: req.session.username });
});

app.get('/user/create_account', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		res.set('Content-Type', 'application/json');
		res.status(302).send({ 'redirect': ('/users/' + req.body.username) });
	} else {
		res.set('Content-Type', 'text/html');
		res.status(200).render('signup.pug', { username: req.session.username });
	}
});

app.get('/people/:name', (req, res) => {
	Person.findOne({ name: req.params.name }, async function (err, personFound) {
		if (err) { res.status(500).send('Error searching database.'); }
		if (personFound == null) {
			res.status(404).send('Person not found!');
		} else {
			//console.log(personFound);
			let collabMovies = [];
			collabMovies = (personFound.acted.concat(personFound.directed).concat(personFound.wrote));
			//console.log(personFound.directed);

			let collab = await findCollab(collabMovies, personFound.name); //At bottom of page
			//console.log(collab);
			res.set('Content-Type', 'text/html');
			personFound.acted = personFound.acted.slice(0, 5);
			personFound.wrote = personFound.wrote.slice(0, 5);
			personFound.directed = personFound.directed.slice(0, 5);
			if (req.session.hasOwnProperty('username')) {
				User.findOne({ username: req.session.username }, function (error, docs) {
					if (error) { throw error; }

					res.status(200).render('person.pug', { PersonData: personFound, collaborators: collab, followed: docs.peopleFollowed.includes(req.params.name), username: req.session.username, notification: docs.notifications.length });
				}).select('peopleFollowed notifications');
			} else {
				res.status(200).render('person.pug', { PersonData: personFound, collaborators: collab, followed: false, username: req.session.username });
			}
		}
	});
});

app.get('/people/:name/allMoviesActed', (req, res) => {
	Person.findOne({ name: req.params.name }, function (err, personDoc) {
		if (err) { throw err; }
		if (personDoc == null) {
			res.status(404).send('Person not found!');
		} else {
			res.set('Content-Type', 'text/html');
			res.status(200).render('listAll.pug', { dataType: 'Movies Acted In', dataLink: '/movies/', name: req.params.name, dataList: personDoc.acted, username: req.session.username });
		}
	}).select('acted');
});

app.get('/people/:name/allMoviesWritten', (req, res) => {
	Person.findOne({ name: req.params.name }, function (err, personDoc) {
		if (err) { throw err; }
		if (personDoc == null) {
			res.status(404).send('Person not found!');
		} else {
			res.set('Content-Type', 'text/html');
			res.status(200).render('listAll.pug', { dataType: 'Movies Written', dataLink: '/movies/', name: req.params.name, dataList: personDoc.wrote, username: req.session.username });
		}
	}).select('wrote');
});

app.get('/people/:name/allMoviesDirected', (req, res) => {
	Person.findOne({ name: req.params.name }, function (err, personDoc) {
		if (err) { throw err; }
		if (personDoc == null) {
			res.status(404).send('Person not found!');
		} else {
			res.set('Content-Type', 'text/html');
			res.status(200).render('listAll.pug', { dataType: 'Movies Directed', dataLink: '/movies/', name: req.params.name, dataList: personDoc.directed, username: req.session.username });
		}
	}).select('directed');
});

app.get('/person', (req, res) => { //page for creating a person in the database
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; }
			if (user.contributingUser) {
				res.set('Content-Type', 'text/html');
				res.status(302).render('createPerson.pug', { username: req.session.username, notification: user.notifications.length });
			} else {
				res.status(401).send('You are not a contributing user!');
			}
		}).select('contributingUser notifications');
	} else {
		res.status(401).send('You are not logged in!');
	}
});

app.get('/loginImg', (req, res) => {
	res.set('Content-Type', 'image/gif');
	res.status(200).sendFile(path + '/src/loginImg.jpg');
});

app.get('/favicon.ico', (req, res) => {
	res.set('Content-Type', 'image/ico');
	res.status(200).sendFile(path + '/src/favicon.ico');
});

app.get('/stylesheet', (req, res) => {
	res.set('Content-Type', 'text/css');
	res.status(200).sendFile(path + '/src/stylesheet.css');
});

app.get('/client', (req, res) => {
	res.set('Content-Type', 'text/javascript');
	res.status(200).sendFile(path + '/scripts/client.js');
});




app.post('/movie/people_finder', (req, res) => { //dynamic person search, should return names starting with req.name
	Person.find({ $text: { $search: req.body.name } }).limit(6).select('name').exec(function (err, names) {
		if (err) { throw err; }
		res.status(200).send(JSON.stringify(names));
	});
});

app.post('/movie/movie_finder', (req, res) => { //dynamic person search, should return ids by looking up titles
	//console.log(req.body);
	Movie.findOne({ Title: req.body.title }).select('_id Poster').exec(function (err, movie) {
		if (err) { throw err; }
		if (movie == null) {
			res.status(404).send('Couldn\'t find movie');
		} else {
			res.status(200).send(JSON.stringify({ 'Id': movie._id, 'Poster': movie.Poster }));
		}
	});
});

app.post('/movie/poster_finder', (req, res) => {
	Movie.findOne({ _id: req.body.id }).select('Poster').exec(function (err, movie) {
		if (err) { throw err; }
		if (movie == null) {
			res.status(404).send('Couldn\'t find movie');
		} else {
			res.status(200).send(JSON.stringify({ 'Poster': movie.Poster }));
		}
	});
});

app.post('/movie/review_finder', (req, res) => {
	Review.findOne({ _id: req.body.id }, function (err, review) {
		if (err) { throw err; }
		else if (review == null) {
			res.status(404).send('Movie not found!');
		} else {
			res.status(200).send(JSON.stringify(review));
		}
	});
});

app.post('/users', (req, res) => {
	User.findOne({ username: req.body.username }, function (err, userDoc) {
		if (err) { throw err; }
		if (userDoc != null) {
			res.status(409).send('User already taken!');
		} else {
			new User({ username: req.body.username, password: req.body.password, loggedIn: true }).save(function (err) {
				if (err) { throw err; }
				console.log('New user "' + req.body.username + '" created!');
				req.session.username = req.body.username;
				res.status(302).send(JSON.stringify({ 'redirect': ('/users/' + req.body.username) }));
			});
		}
	}).select('_id');
});

app.post('/user/login', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		res.status(401).send('Already logged in');
	}
	User.findOne({ username: req.body.username }, function (err, userDoc) {
		if (err) { throw err; }
		if (userDoc == null || userDoc.password != req.body.password || userDoc.loggedIn == true) {
			res.status(401).send('Bad login');
		} else {
			User.updateOne({ username: req.body.username }, { loggedIn: true }, function (error) {
				if (error) { throw error; }
				req.session.username = req.body.username;
				res.status(302).send('OK');
			});
		}
	}).select('password loggedIn');
});

app.post('/user/logout', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, userDoc) {
			if (err) { throw err; }
			if (userDoc == null || userDoc.loggedIn == false) {
				res.status(401).send('Cannot logout a non existing account or one that is not signed in');
			} else {
				User.updateOne({ username: req.session.username }, { loggedIn: false }, function (error) {
					if (error) { throw error; }
					delete req.session.username;
					res.status(302).send('OK');
				});
			}
		}).select('loggedIn');
	} else {
		res.status(401).send('Cannot logout an account that is not signed in');
	}
});

app.post('/people', (req, res) => { //adds new person
	console.log(req.body);
	Person.findOne({ name: req.body.name }, function (err, user) {
		if (err) { throw err; }
		if (user != null) {
			res.status(409).send('User already exists!');
		}
		else {
			let p = new Person({ name: req.body.name, acted: [], wrote: [], directed: [], following: [] });
			p.save(function (err) { if (err) throw err; });
			res.status(200).send('Added user!');
		}
	});
});

app.post('/movies', (req, res) => {//adds new movie
	Movie.findOne({ title: req.body.movie["Title"] }, async function (err, movieCheck) {
		if (err) { throw err; }
		if (movieCheck != null) {
			res.status(409).send('Movie already exists!');
		}
		else {
			let m = new Movie({});
			let movie = req.body.movie;
			m.Title = movie["Title"];
			m.Rating = movie["Rated"];
			m.ReleaseDate = movie["Released"];
			m.averageRating = 0;
			m.Runtime = movie["Runtime"];
			m.Plot = movie["Plot"];
			m.Genres = movie["Genres"];
			m.Poster = movie["Poster"];
			m.Reviews = [];
			m.Actors = [];
			m.Writers = [];
			m.Directors = [];
			let peopleNotified = []; //Made so as not to notify user multiple times for one movie created if multiple roles.
			await Promise.all(movie["Actors"].map(async (actor) => {
				m.Actors.push(actor);
				if (!peopleNotified.includes(actor)) {
					peopleNotified.push(actor);
					let users = await Person.findOne({ name: actor }).select('usersFollowing');
					await notifyUsers(users.usersFollowing, "movie", actor, m._id, m.Title);
				}
				await Person.updateOne({ name: actor }, { $push: { acted: movie.Title } });
			}));
			await Promise.all(movie["Writers"].map(async (writer) => {
				m.Writers.push(writer);
				if (!peopleNotified.includes(writer)) {
					peopleNotified.push(writer);
					let users = await Person.findOne({ name: writer }).select('usersFollowing');
					await notifyUsers(users.usersFollowing, "movie", writer, m._id, m.Title);
				}
				await Person.updateOne({ name: writer }, { $push: { wrote: movie.Title } });
			}));
			await Promise.all(movie["Directors"].map(async (director) => {
				m.Directors.push(director);
				if (!peopleNotified.includes(director)) {
					peopleNotified.push(director);
					let users = await Person.findOne({ name: director }).select('usersFollowing');
					await notifyUsers(users.usersFollowing, "movie", director, m._id, m.Title);
				}
				await Person.updateOne({ name: director }, { $push: { directed: movie.Title } });
			}));
			await m.save();
			res.status(302).send(JSON.stringify({ redirect: '/movies/' + m._id }));
		}
	});
});

app.post('/movies/:movieID/reviews', (req, res) => {//adds review to movie and user, changes movie average rating
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; } //error checking just in case
			else if (user == null) {
				res.status(404).send('User not found!');
			} else {
				Movie.findById(req.params.movieID, function (error, movie) {
					if (error) { throw error; }
					else if (movie == null) {
						res.status(404).send('Movie not found!');
					} else {
						let newRating = ((movie.AverageRating * movie.numRatings) + parseInt(req.body.rating, 10)) / (movie.numRatings + 1);  //Needs to be fixed!
						let review = new Review({});
						review.small = req.body.shortRev;
						review.big = req.body.longRev;
						review.rating = req.body.rating;
						review.user = req.session.username;
						review.movie = { id: req.params.movieID, Title: movie.Title };
						review.save(function (saveErr) {
							if (saveErr) { throw saveErr; }
							User.updateOne({ username: req.session.username }, { $push: { reviews: review._id } }, (userErr) => {
								if (userErr) { throw userErr; } //add all users following push notification.
								Movie.updateOne({ _id: req.params.movieID }, { $push: { Reviews: review._id }, AverageRating: newRating, numRatings: (movie.numRatings + 1) }, async (movErr) => {
									if (movErr) { throw movErr; }
									await notifyUsers(user.usersFollowing, "review", req.session.username, movie._id, movie.Title);
									res.set('Content-Type', 'application/json');
									res.status(200).send(JSON.stringify({ location: review._id })); //Sends id so it can render from database on page without reloading whole page.
								});
							});
						});
					}
				}).select('AverageRating numRatings Reviews Title _id');
			}
		}).select('usersFollowing');
	}
	else { res.status(401).send('You need to be logged in to do that!'); }
});



app.patch('/movies/:id/watched', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; } //error checking just in case
			if (user == null) {
				res.status(404).send('User not found!');
			} else {
				res.set('Content-Type', 'text/html');
				if (user.moviesWatched.includes(req.params.id)) {
					User.updateOne({ username: req.session.username }, { $pull: { moviesWatched: req.params.id } }, function (err) {
						if (err) { throw err; }
						res.status(200).send('Unwatched movie!');
					});
				} else {
					User.updateOne({ username: req.session.username }, { $push: { moviesWatched: req.params.id } }, function (err) {
						if (err) { throw err; }
						res.status(200).send('Watched movie!');
					});
				}
			}
		});
	}
	else {
		res.status(401).send('You need to be logged in to do that!');
	}
});

app.patch('/users/:username/follow', (req, res) => {//follows/unfollows other user
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; } //error checking just in case
			if (user == null) {
				res.status(404).send('Logged in user not found!');
			} else {
				User.findOne({ username: req.params.username }, function (error, userOther) {
					if (error) { throw error; } //error checking just in case
					if (userOther == null) {
						res.status(404).send('Follow user not found!');
					} else {
						res.set('Content-Type', 'text/html');
						if (user.usersFollowed.includes(req.params.username)) {
							User.updateOne({ username: req.session.username }, { $pull: { usersFollowed: req.params.username } }, function (userErr) {
								if (userErr) { throw userErr; }
								User.updateOne({ username: req.params.username }, { $pull: { usersFollowing: req.session.username } }, function (otherErr) {
									if (otherErr) { throw otherErr; }
									res.status(200).send('User unfollowed!');
								});
							});
						} else {
							User.updateOne({ username: req.session.username }, { $push: { usersFollowed: req.params.username } }, function (userErr) {
								if (userErr) { throw userErr; }
								User.updateOne({ username: req.params.username }, { $push: { usersFollowing: req.session.username } }, function (otherErr) {
									if (otherErr) { throw otherErr; }
									res.status(200).send('User followed!');
								});
							});
						}
					}
				});
			}
		}).select('usersFollowed');
	}
	else {
		res.status(401).send('You need to be logged in to do that!');
	}
});

app.patch('/people/:name/follow', (req, res) => {//follows/unfollows person
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; } //error checking just in case
			if (user == null) {
				res.status(404).send('User not found!');
			} else {
				Person.findOne({ name: req.params.name }, function (err, person) {
					if (err) { throw err; } //error checking just in case
					if (person == null) {
						res.status(404).send('Person not found!');
					} else {
						res.set('Content-Type', 'text/html');
						if (user.peopleFollowed.includes(req.params.name)) {
							User.updateOne({ username: req.session.username }, { $pull: { peopleFollowed: req.params.name } }, function (userErr) {
								if (userErr) { throw userErr; }
								Person.updateOne({ name: req.params.name }, { $pull: { usersFollowing: req.session.username } }, function (perErr) {
									if (perErr) { throw perErr; }
									res.status(200).send('Person unfollowed!');
								});
							});
						} else {
							User.updateOne({ username: req.session.username }, { $push: { peopleFollowed: req.params.name } }, function (userErr) {
								if (userErr) { throw userErr; }
								Person.updateOne({ name: req.params.name }, { $push: { usersFollowing: req.session.username } }, function (perErr) {
									if (perErr) { throw perErr; }
									res.status(200).send('Person followed!');
								});
							});
						}
					}
				});
			}
		}).select('peopleFollowed');
	}
	else {
		res.status(401).send('You need to be logged in to do that!');
	}
});

app.patch('/user/contributing', (req, res) => {//sets contributing user, needs bool req.contributing
	if (req.session.hasOwnProperty('username')) {
		User.findOne({ username: req.session.username }, function (error, foundUser) {
			if (error) { throw error; }
			User.updateOne({ username: req.session.username }, { contributingUser: !foundUser.contributingUser }, function (err, user) {
				if (err) { throw err; }
				if (user == null) { res.status(404).send('User not found!'); }
				else if (foundUser.contributingUser) {
					res.status(200).send('You are no longer a contributing user');
				} else {
					res.status(200).send('You are now a contributing user');
				}
			});
		}).select('contributingUser');
	}
	else {
		res.status(401).send('You need to be logged in to do that!');
	}
});

app.patch('/user/notifications', (req, res) => {
	if (req.session.hasOwnProperty('username')) {
		index = 'notifications' + req.body.index;
		User.findOne({ username: req.session.username }, function (err, user) {
			if (err) { throw err; }
			user.notifications.splice(parseInt(req.body.index, 10), 1);
			User.updateOne({ username: req.session.username }, { notifications: user.notifications }, function (error) {
				if (error) { throw error; }
				res.set('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(user.notifications));
			});
		}).select('notifications');
	} else {
		res.status(401).send('You need to be logged in to do that!');
	}
});

app.listen(process.env.PORT || PORT);
console.log('Express server running at http://127.0.0.1:3000/ or http://localhost:3000');







async function findCollab(collabMovies, ownName) { //May want to make actors/writers/directors name all saved for one movie and compare when adding amount....
	let collab = [];
	for (movie in collabMovies) { //Figure out how to make this synchronous!
		//console.log('movie name: ' + collabMovies[movie]);
		let movieDoc = await Movie.findOne({ Title: { "$regex": collabMovies[movie] } }).select('Actors Directors Writers').exec();
		collab = findCollabHelper(collab, movieDoc.Actors, ownName);
		collab = findCollabHelper(collab, movieDoc.Directors, ownName);
		collab = findCollabHelper(collab, movieDoc.Writers, ownName);
		//console.log(collab);
	}
	collab.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
	//console.log(collab);
	collab.splice(5);
	return collab;
}

function findCollabHelper(collab, people, ownName) {
	for (named in people) {
		if (people[named] != ownName) {
			let collabElem = collab.find(element => element.name == people[named]);
			if (collabElem == undefined) {
				collab.push({ name: people[named], amount: 1 });
			} else {
				collabElem.amount++;
			}
		}
	}
	return collab;
}

async function getRecommended(reviews, thisMovieId) {
	let genres = [];
	await Promise.all(reviews.map(async function (review) {
		let revFound = await Review.findOne({ _id: review }).select('rating movie');
		if (revFound.rating > 5) {
			let movie = await Movie.findOne({ _id: revFound.movie.id }).select('Genres');
			if (movie != []) {
				movie.Genres.forEach(function (genre) {
					genres.push(genre);
				});
			}
		}
	}));
	let randPickGenres = [];
	let alreadyPicked = [thisMovieId];
	let arr = [0, 1, 2, 3, 4];
	let recMovies = await arr.reduce(async function (memo, i) { //5 random genres chosen
		await memo;
		let genre = genres[Math.floor(Math.random() * genres.length)];
		randPickGenres.push(genre);
		let offset = 0;
		randPickGenres.forEach(function (curGen) {
			if (genre == curGen) {
				offset += 2;
			}
		});
		let temp = await memo;
		alreadyPicked = temp.reduce((m,i)=>{
			let temp = m;
			temp.push(i._id);
			m = temp;
			return m;
		}, [thisMovieId]);
		let movies = await Movie.find({ $text: { $search: genre }, _id: { $nin: alreadyPicked } }).limit(2).select('_id Poster').skip(offset);
		temp = temp.concat(movies);
		memo = temp;
		return memo;
	}, []);
	if (recMovies.length < 10) {
		let offset = 0;
		randPickGenres.forEach(function (curGen) {
			if (genres[0] == curGen) {
				offset += 2;
			}
		});
		Movie.find({ $text: { $search: genres[0] }, _id: { $nin: alreadyPicked } }, function (finalError, filler) {
			if (finalError) { throw finalError; }
			filler.forEach(function (fill) {
				recMovies.push({ id: fill._id, Poster: fill.Poster });
			});
			return (recMovies);
		}).limit(10 - recMovies.length).select('_id Poster').skip(offset);
	} else {
		return (recMovies);
	}
}

async function getSimilarMovies(genres, thisMovieId) {
	
	let alreadyPicked = [thisMovieId];
	let randPickGenres = [];
	let arr = [0, 1, 2, 3, 4];
	let recMovies = await arr.reduce(async function (memo, i) { //5 random genres chosen
		await memo;
		let genre = genres[Math.floor(Math.random() * genres.length)];
		randPickGenres.push(genre);
		let offset = 0;
		randPickGenres.forEach(function (curGen) {
			if (genre == curGen) {
				offset += 2;
			}
		});
		let temp = await memo;
		alreadyPicked = temp.reduce((m,i)=>{
			let temp = m;
			temp.push(i._id);
			m = temp;
			return m;
		}, [thisMovieId]);
		let movies = await Movie.find({ $text: { $search: genre }, _id: { $nin: alreadyPicked } }).limit(2).select('_id Poster').skip(offset);
		temp = temp.concat(movies);
		memo = temp;
		return memo;
	}, []);
	if (recMovies.length < 10) {
		let offset = 0;
		randPickGenres.forEach(function (curGen) {
			if (genres[0] == curGen) {
				offset += 2;
			}
		});
		Movie.find({ $text: { $search: genres[0] }, _id: { $nin: alreadyPicked } }, function (finalError, filler) {
			if (finalError) { throw finalError; }
			filler.forEach(function (fill) {
				recMovies.push({ id: fill._id, Poster: fill.Poster });
			});
			return (recMovies);
		}).limit(10 - recMovies.length).select('_id Poster').skip(offset);
	} else {
		return (recMovies);
	}
}

async function notifyUsers(usersFollowing, type, name, movieId, movieTitle) {
	let noti = {
		Type: type,
		name: name,
		movieId: movieId,
		movieTitle: movieTitle,
	};
	if (type == "movie") {
		noti.text = ' has worked on ';
	} else if (type == "review") {
		noti.text = ' has created a new review on ';
	}
	await Promise.all(usersFollowing.map(async function (user) {
		await User.updateOne({ username: user }, { $push: { notifications: noti } });
	}));
}
