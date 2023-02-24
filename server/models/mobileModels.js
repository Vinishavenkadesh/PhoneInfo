const mongoose = require("mongoose");

const mobileSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Brand: {
      type: String,
      require: true,
    },
    Memory: {
      type: String,
      require: true,
    },
    Display: {
      type: String,
      require: true,
    },
    Camera: {
      type: String,
      require: true,
    },
    Battery: {
      type: String,
      require: true,
    },
    Processor: {
      type: String,
      require: true,
    },
    Amazon: {
      type: String,
      require: true,
    },
    Flipkart: {
      type: String,
      require: true,
    },
    Image: {
      type: String,
      require: true,
    },
    Price: {
      type: Array,
      require: true,
    },
  },
  {
    timeStramps: true,
  }
);

const Mobiles = mongoose.model("Mobile", mobileSchema);

module.exports = Mobiles;
