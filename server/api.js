/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Review = require("./models/review");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const yelp = require("./yelp-api.js");

//initialize socket
// const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// router.post("/initsocket", (req, res) => {
//   // do nothing if user not logged in
//   if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
//   res.send({});
// });

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/review", auth.ensureLoggedIn, (req, res) => {
  const currentTime = new Date();
  const newReview = new Review({
    drink_name: req.body.drink_name,
    shop_id: req.body.shop_id,
    author_id: req.user._id,
    timestamp: currentTime,
    date_visited: req.body.date_visited,
    photo_link: req.body.photo_link,
    price: req.body.price,
    size_temperature: req.body.size_temperature,
    ice: req.body.ice,
    sugar: req.body.sugar,
    toppings: req.body.toppings,
    stars: req.body.stars,
    review_text: req.body.review_text,
  });

  newReview.save().then((review) => res.send(review));
});

router.get("/review", (req, res) => {
  Review.find(req.query).then((reviews) => res.send(reviews));
});

router.get("/autocomplete/shop", (req, res) => {
  yelp
    .get("https://api.yelp.com/v3/businesses/search", req.query)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
