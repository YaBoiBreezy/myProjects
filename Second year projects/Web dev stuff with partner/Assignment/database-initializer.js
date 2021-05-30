const mongoose = require('mongoose');
const async = require('async');
let models = require('./public/scripts/mongooseModels.js');
let data = require("./movieData/movie-data-2500.json");

let Person = models.Person;
let Movie = models.Movie;
let User = models.User;

mongoose.connect("mongodb://localhost:27017/database", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;

    async.parallel([
        function (callback) {
            Movie.collection.drop(callback);
        }, function (callback) {
            Person.collection.drop(callback);
        }, function (callback){
            User.collection.drop(callback);
        }], async function (err, docs) {
            if (err) { console.log("Error dropping collection. Likely case: collection did not exist (don't worry unless you get other errors...)"); }
            else { console.log("Cleared Movie, Person, and User collections"); }
            console.log('Adding all movies to database. This will take a minute...');
            let movieCount = 0;
            let peopleAdded = [];
            await Promise.all(data.map(async (movie) => {
                let m = new Movie({});
                m.Title = movie["Title"];
                m.Year = movie["Year"];
                m.Rating = movie["Rated"];
                m.ReleaseDate = movie["Released"];
                m.AverageRating = 0;
                m.Runtime = movie["Runtime"];
                m.Plot = movie["Plot"];
                m.Genres = movie["Genre"];
                m.Poster = movie["Poster"];
                m.Reviews = [];
                await Promise.all(movie["Actors"].map(async (actor) => {
                    m.Actors.push(actor);
                    if (!peopleAdded.includes(actor)) {
                        let p = new Person({ name: actor, acted: [m.Title], wrote: [], directed: [] });
                        peopleAdded.push(actor);
                        await p.save();
                    }
                    else {
                        await Person.updateOne({ name: actor }, { $push: { acted: movie.Title } });
                    }
                }));
                await Promise.all(movie["Writer"].map(async (writer) => {
                    m.Writers.push(writer);
                    if (!peopleAdded.includes(writer)) {
                        let p = new Person({ name: writer, acted: [], wrote: [m.Title], directed: [] });
                        peopleAdded.push(writer);
                        await p.save();
                    }
                    else {
                        await Person.updateOne({ name: writer }, { $push: { wrote: movie.Title } });
                    }
                }));
                await Promise.all(movie["Director"].map(async (director) => {
                    m.Directors.push(director);
                    if (!peopleAdded.includes(director)) {
                        let p = new Person({ name: director, acted: [], wrote: [], directed: [m.Title] });
                        peopleAdded.push(director);
                        await p.save();
                    }
                    else {
                        await Person.updateOne({ name: director }, { $push: { directed: m.Title } });
                    }
                }));
                movieCount++;
                await m.save();
            }));
            console.log('Finished adding ' + movieCount + ' movies and ' + peopleAdded.length + ' people added to the database!');
            mongoose.connection.close();
            process.exit(0);
        });
});