const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  review_id: String,
  drink_name: String,
  shop_yelp_id: String,
  author_google_id: String,
  timestamp: Date,
  photo_link: String,
  price: String,
  size_temperature: String,
  ice: String,
  sugar: String,
  toppings: String,
  stars: Number,
  review_text: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
