const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ secret: 'what\' up gamers'}));
app.set("view engine", "pug");
app.locals.products = require("./products.json");
app.locals.users = require("./users.json");
app.locals.reviews = require("./reviews.json");

//Require and mount the various routers
//There is one router for each main type of resource
let userRouter = require("./user-router");
app.use("/users", userRouter);
let productsRouter = require("./products-router");
app.use("/products", productsRouter);
let reviewsRouter = require("./reviews-router");
app.use("/reviews", reviewsRouter);

//Respond with home page data if requested
app.get("/", (req, res, next)=> { res.render("pages/index"); });

app.listen(3000);
console.log("Server listening at http://localhost:3000");
