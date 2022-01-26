const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  parent_id: String,
  up: [String],
  down: [String],
});

// compile model from schema
module.exports = mongoose.model("vote", VoteSchema);
