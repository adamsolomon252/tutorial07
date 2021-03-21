const express = require('express');
const app = express();
app.set('trust proxy', 1) // trust the first proxy --- (Problem 1)

//create express session ---(Problem 1)
const session = require('express-session');
app.use(session({
  secret: 'chocolate cake',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.set("view engine", "pug");
app.locals.products = require("./products.json");
app.locals.users = require("./users.json");
app.locals.reviews = require("./reviews.json");

//trying to log the session data for each request in your server ---(Problem 1)
app.use(function(req, res, next){
  console.log(req.session);
  next();
})

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
