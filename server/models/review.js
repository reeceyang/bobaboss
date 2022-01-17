const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  drink_name: String,
  shop_id: String,
  shop_name: String,
  author_id: String,
  author_name: String,
  timestamp: Date,
  date_visited: Date,
  photo_link: String,
  price: String,
  size: String,
  temperature: String,
  ice: String,
  sugar: String,
  toppings: String,
  stars: Number,
  review_text: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
