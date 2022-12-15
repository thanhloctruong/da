const mongoose = require("mongoose");

const package = new mongoose.Schema({
  idpackage: {
    type: String,
  },
  idorder: {
    type: String,
  },
  idcontainer: {
    type: String,
  },
  host: {
    type: String,
  },
  located: {
    type: String,
  },
  items: [],
});

module.exports = mongoose.model("Package", package);
