const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);


const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    wrote: { type: [String], default: [] },
    acted: { type: [String], default: [] },
    directed: { type: [String], default: [] },
    usersFollowing: { type: [String], default: [] },
});
personSchema.index({ name: 'text' });

const reviewSchema = new mongoose.Schema({
    small: { type: String, required: true },
    big: String,
    rating: { type: Number, required: true },
    user: { type: String, required: true },
    movie: { type: { id: String, Title: String }, required: true },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    loggedIn: { type: Boolean, default: false },
    contributingUser: { type: Boolean, default: false },
    peopleFollowed: { type: [String], default: [] },
    usersFollowed: { type: [String], default: [] },
    moviesWatched: { type: [String], default: [] },
    usersFollowing: { type: [String], default: [] },   //for notifications
    notifications: { type: [{Type: String, name: String, movieId: String, movieTitle: String, text: String}], default: [] },
    reviews: { type: [String], default: [] }, 
});

const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Year: Number,
    Rating: String,
    ReleaseDate: String,
    Runtime: String,
    Plot: String,
    Genres: { type: [String], default: [] },
    Directors: { type: [String], default: [] },
    Writers: { type: [String], default: [] },
    Actors: { type: [String], default: [] },
    Poster: String,
    Reviews: { type: [String], default: [] },
    AverageRating: { type: Number, default: 0 },
    numRatings: { type: Number, default: 0 },
});
movieSchema.index({ Title: 'text', Genres: 'text' });

module.exports = {
    Person: mongoose.model('Person', personSchema),
    Review: mongoose.model('Review', reviewSchema),
    User: mongoose.model('User', userSchema),
    Movie: mongoose.model('Movie', movieSchema)
}