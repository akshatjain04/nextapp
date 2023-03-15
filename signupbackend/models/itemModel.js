const mongoose = require("mongoose");

const ItemTemplate = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
  },
  availability: {
    type: String,
  },
  labels: {
    type: Array,
  },
  owner: {
    type: String,
  },
  Date: {
    type: Date,
    default:Date.now
  }
});

module.exports = mongoose.model("myitems", ItemTemplate);
