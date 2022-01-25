const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: Date,
});

// compile model from schema
module.exports = mongoose.model("contact", ContactSchema);
