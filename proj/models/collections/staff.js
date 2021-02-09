const mongoose = require("mongoose");

const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  title: String,
  gender: String,
  doj: Date,
  dob: Date,
  address: String,
  status: Boolean
});
staffSchema.plugin(paginate);

staff = mongoose.model("staff", staffSchema);

module.exports = staff;
