const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlCode: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
    },
    longURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//export schema
module.exports = mongoose.model("url", urlSchema);
