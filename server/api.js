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

router.post("/review/delete", auth.ensureLoggedIn, async (req, res) => {
  const review = await Review.findById(req.body._id);
  if (!review) return res.status(400).send({ message: "review does not exist" });
  if (req.user._id !== review.author_id) {
    return res.status(400).send({ message: "user id and author id do not match" });
  }
  if (review.photo_link) {
    bucket
      .file(review.photo_link)
      .delete()
      .then(() => {
        console.log("deleted " + review.photo_link);
      });
  }
  Review.deleteOne({ _id: req.body._id }).then(() => {
    res.send("deleted review " + req.body._id);
  });
});

router.post("/review", auth.ensureLoggedIn, async (req, res) => {
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
    if (!req.body._id) {
      newReview.save().then((review) => res.send(review));
    } else {
      const review = await Review.findById(req.body._id);
      if (req.user._id !== review.author_id) {
        return res.status(400).send({ message: "user id and author id do not match" });
      }
      for (const [key, value] of Object.entries(req.body)) {
        review[key] = value;
      }
      review.save();
      res.send(review);
    }
  }
});

// send 10 most recent reviews
router.get("/review/trending", (req, res) => {
  Review.find({})
    .sort({ timestamp: -1 })
    .then((reviews) => res.send(reviews.slice(0, 10)))
    .catch((error) => console.log(error));
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

const isImage = require("is-image");
router.post("/upload/image", upload.single("photo"), auth.ensureLoggedIn, (req, res) => {
  if (!isImage(req.file.originalname)) {
    return res.status(400).send({ message: "only photo uploads are allowed" });
  }
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
