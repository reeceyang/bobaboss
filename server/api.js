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

const multer = require("multer");
const upload = multer();

const yelp = require("./yelp-api.js");

const { Storage } = require("@google-cloud/storage");

const keysEnvVar = Buffer.from(process.env["CREDS"], "base64").toString();
if (!keysEnvVar) {
  throw new Error("The $CREDS environment variable was not found!");
}
const keys = JSON.parse(keysEnvVar);

const storageOptions = {
  projectId: keys.project_id,
  credentials: {
    client_email: keys.client_email,
    private_key: keys.private_key,
  },
};
const storage = new Storage(storageOptions);
const bucket = storage.bucket("boba-photos");

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
router.get("/user", (req, res) => {
  User.find({ _id: req.query.userId }).then((user) =>
    res.send({ name: user[0].name, _id: user[0]._id })
  );
});

const validateReview = (review) => {
  errors = [];
  if (review.drink_name === "") errors.push("you must include a flavor");
  if (review.shop_id === "" || review.shop_name === "") errors.push("you must select a shop");
  if (isNaN(new Date(review.date_visited).getTime())) errors.push("you must provide a valid date");
  if (isNaN(review.price) || review.price < 0)
    errors.push("you must provide a valid price (decimal number at least zero)");
  if (review.temperature !== "hot" && review.temperature !== "cold")
    errors.push("you must choose either hot or cold for temperature");
  if (review.stars === null) errors.push("you must choose a valid star rating");
  return errors;
};

router.post("/review", auth.ensureLoggedIn, (req, res) => {
  const errors = validateReview(req.body);
  if (errors.length > 0) {
    res.status(400).send({
      message: JSON.stringify({ errors: errors }),
    });
  } else {
    const currentTime = new Date();
    const newReview = new Review({
      drink_name: req.body.drink_name,
      shop_id: req.body.shop_id,
      shop_name: req.body.shop_name,
      author_id: req.user._id,
      author_name: req.user.name,
      timestamp: currentTime,
      date_visited: req.body.date_visited,
      photo_link: req.body.photo_link,
      price: req.body.price,
      size: req.body.size,
      temperature: req.body.temperature,
      ice: req.body.ice,
      sugar: req.body.sugar,
      toppings: req.body.toppings,
      stars: req.body.stars,
      review_text: req.body.review_text,
    });
    newReview.save().then((review) => res.send(review));
  }
});

router.get("/review/regex", (req, res) => {
  let a = {};
  a[req.query.field] = { $regex: req.query.regex, $options: req.query.options };
  Review.find(a).then((reviews) => res.send(reviews));
});

router.get("/review", (req, res) => {
  Review.find(req.query)
    .then((reviews) => res.send(reviews))
    .catch((error) => console.log(error));
});

router.get("/autocomplete/shop", (req, res) => {
  yelp
    .get("https://api.yelp.com/v3/businesses/search", req.query)
    .then((shops) => res.send(shops))
    .catch((error) => console.log(error));
});

router.post("/upload/image", upload.single("photo"), auth.ensureLoggedIn, (req, res) => {
  const photoName = req.user._id + "_" + String(new Date().getTime()) + "_" + req.file.originalname;
  const file = bucket.file(photoName);
  const contents = req.file.buffer;
  file.save(contents).then((err) => {
    if (!err) {
      console.log(photoName);
      res.send({ photoName: photoName });
    }
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
