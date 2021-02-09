const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const instituteSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    reqired: true
  },
  address_one: {
    type: String,
    required: true
  },
  address_two: {
    type: String,
    required: true
  },
  city: String,
  phone: Number,
  mail: String,
  web: String
});

module.exports = mongoose.model("institute", instituteSchema);
