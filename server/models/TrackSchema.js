const mongoose = require("mongoose");

const TrackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
});

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
