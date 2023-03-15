const mongoose = require("mongoose");

const signupTemplate = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mytable", signupTemplate);
