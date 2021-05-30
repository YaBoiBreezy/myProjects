# COMP2406-Dylan-Alexander
Project requirements:
50%
a) User accounts (6 marks) 
b) Viewing movies (8 marks) 
c) Viewing people (8 marks) 
d) Viewing Users (8 marks) 
e) Contributing user functionality (10 marks) 
f) Following and notifications (10 marks)

10%
Overall interface quality, including factors like organization, visual appeal, responsiveness, and ability to handle different window sizes. 

15%
MongoDB intergration
All movie, people, user, and session data stored in a MongoDB(should probs use Mongoose too). Needs database initialization script that will create and add the initial state of your server into an empty Mongo database.

25%
Overall Design and Implementation Quality
Code quality and organization, effective use of RESTful design principles, use of proper HTTP status codes, proper error handling, use of asynchronous operations, minimization of required data transfer, etc.. You must include a short report with your final project submission that explains what good design/implementation properties your project has


Movie Database
Project Background
The goal of this project will be to create a web application similar to the Internet Movie
Database. Your application will maintain a database of movie information, including
things like the movie title, release year, writers, actors, etc. Your site will support regular
users, who will be capable of browsing all of the information on the site and adding
movie reviews. You will also need to support contributing users, who will be able to add
new people/movies. The site will also offer movie recommendations based on a user’s
data. Within this document, the term ‘people’ is used to refer to people that are part of a
movie (actor, writer, director, etc.), while the term ‘user’ refers to a user of your
application. The following sections will outline the minimum requirements of the movie
database project. You are encouraged to ask questions to clarify the requirements and
constraints of the project.
Provided Data and Assumptions
The provided project zip file contains several files with initial movie data retrieved from
The Open Movie Database. Each of these files contain data with the same format,
which you can use to initialize the data for your project. The only difference is the
number of movies contained in the file (10, 100, 1000, 2500). It is advisable to use a
smaller file for your initial development. Your final submission will be required to work
with the 2500 movie dataset. For the purposes of this project, you can assume that
actor/director/writer names are unique. If movie X lists “Norman Cates” as an actor and
movie Y lists “Norman Cates” as a director, you can assume these refer to the same
person.
Technology Constraints
The server code for your project must use Node.js. All client resources required by your
project must be served by your server. Your client must work well within an up-to-date
Chrome browser, which is what will be used to evaluate your project’s frontend. Your
project’s data must be stored using a local MongoDB database (i.e., you cannot use the
Atlas cloud database service). Your final submission must be able to be completely
installed using the command npm install. Only approved modules may be used.
You may assume any modules mentioned in the lectures or notes are allowed. If you
are unsure if something is allowed or would like to see if something could be allowed, 
COMP 2406 – Fall 2020 Movie Database Project
2
you should ask for clarification before proceeding. Any additional software, modules,
frameworks, etc. you use must be able to be installed using your NPM install script.
User Accounts
The application must provide a way for users to create new accounts by specifying a
username and password. Your account creation page must only require a username
and password (i.e., no email, confirm password, etc.) and should not have any security
constraints such as requiring passwords to contain special characters (these are good
things to add in a real application but make grading hundreds of projects a hassle).
Within your application, usernames must be unique. A user should be able to log in and
out of the system using their username and password. Within a single browser instance,
only a single user should be able to be logged in at one time (i.e., user A and user B
cannot log in to the system within the same browser window). All newly created
accounts should be considered regular users until the user manually upgrades
themselves to a contributing user.
When a user is logged in, they should be able to view and manage information about
their account. The application must provide a way for the user to:
1. Change between a ‘regular’ user account and a ‘contributing’ user account. If
a user changes account types, it should only affect their ability to carry out an
action in the future. That is, anything created by a user while they have a
contributing user account should remain unaffected if the user switches back
to a regular account.
2. View and manage the people they follow. The user should be able to navigate
to the personal page of any person they have followed. The user should be
able to stop following any person that they have followed.
3. View and manage the other users they follow. The user should be able to
navigate to the user page of any user they have followed. The user should be
able to stop following any user that they have followed.
4. View the list of movies that they have watched (i.e., the user’s ‘watch list’) and
remove any movies from this list. See the Viewing Movies section for
specification of adding movies to the watch list.
5. View recommended movies. These recommendations should be made based
on what information your web application knows about the user, such as what
movies they have reviewed or what people/users they have followed. You do
not need to worry about the overall quality of your recommendation but
should be able to provide justification for the design of your algorithm (e.g.,
similar genres, actors, etc.).
COMP 2406 – Fall 2020 Movie Database Project
3
6. View any notifications that they have received about people or users that they
have followed.
7. Search for movies by title, actor name, and/or genre keyword, at minimum.
Additional types of search can also be included. The user must be able to
navigate to the movie page for any of the movie’s contained in the search
results. By default, the search results should show only 10 movie results and
pagination must be supported (i.e., next/previous buttons to navigate through
remaining search results).
Viewing Movies
When viewing a specific movie, a user must be able to:
1. See the basic movie information, including: the title, release year, average
review rating, runtime, and plot.
2. See each of the genre keywords for the movie and allow the user to navigate
to search results that contain movies with the same genre keyword.
3. See the director, writer, and actors the movie has, and be able to navigate
directly to each person’s page.
8. See a list of similar movies to this one and allow the user to navigate to the
page for any of those movies. You do not need to worry about the overall
quality of your similarity measure but should be able to provide justification for
the design of your algorithm (e.g., similar genres, actors, etc.).
9. Add the movie to their ‘watched list’. This list will be viewable from the user’s
profile. The user’s profile must support allowing the user to remove the movie
from the watched list. You may also allow them to do so from the movie page.
4. See movie reviews that have been added for the movie.
5. Add a basic review by specifying a score out of 10.
6. Add a full review by specifying a score out of 10, a brief summary, and a full
review text.
Viewing People (directors, writers, actors)
When viewing the page for a particular person, the user must be able to:
1. See a history of all of this person’s work. Each movie entry must allow the
user to navigate to that movie’s page.
2. The history of the person’s work should be separated into categories for
directed, written, and acted in. If the user has not directed, wrote, or acted in
a movie (e.g., they have not acted in a movie), then that category should not
be shown on the page.
COMP 2406 – Fall 2020 Movie Database Project
4
3. See a list of frequent collaborators of this person. For the purposes of this
project, the list of frequent collaborators should be the top 5 people the
person has worked with the most according to the data stored within your
application.
4. Choose to follow this person. If a user follows a person, the user should
receive a notification any time a new movie that includes this person is added
to the database.
Viewing Other Users
When viewing the page for another user, the current user must be able to:
1. See a list of all of the reviews this user has made and be able to read each
full review.
2. See a list of all of the people this user has followed and be able to navigate to
each person’s page.
3. See the user’s ‘watch list’ and navigate to any of the movies listed.
4. Choose to follow this user. If a user X follows a user Y, user X should receive
a notification any time user Y creates a new review.
Contributing Users
If a user’s account type is set to be a contributing user, the user should be able to do
everything a regular user can do and also:
1. Navigate to an “Add Person” page and add a new person to the database by
specifying their name. If the name already exists, the user should not be able
to add the new person.
2. Navigate to an “Add Movie” page and add a new movie by specifying the title,
release year, runtime, plot, genre keywords, and at least one writer, director,
and actor. The entire movie creation process must be done on a single page.
The page must give the user a way to dynamically search for people within
the database to add to the movie (e.g., using AJAX). The user should not be
required to type in the full name of the person, but instead should be able to
add the person as a writer, director, or actor directly from the search results.
Project Report
You will also be required to submit a project report with your final submission that must
include:
1. Detailed steps explaining how to install, initialize, and run your database and
server. You must include a database initialization script with your submission that 
COMP 2406 – Fall 2020 Movie Database Project
5
will create a new MongoDB database from the provided movie data JSON files.
This will ensure that a database with the data structure required by your project
can be created during the grading process. If you have not used MongoDB, you
should include any file resources your server requires to start and load the
movie/user/etc. data.
2. Discussion and critique of your overall design. See the ‘Overall Design and
Implementation Quality’ section of the marking scheme for ideas on what to
include in your analysis. You should also consider some of the key concerns of
web application development that we have discussed in the class, such as
scalability, latency, etc.
3. Description of your movie recommendation algorithm.
4. Description of your similar movie algorithm.
