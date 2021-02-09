const mongoose = require("mongoose");

const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  rid: {
    type: String,
    Required: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  father_name: String,
  father_no: String,
  qual: String,
  currentCollege: String,
  gender: {
    type: String,
    required: true
  },
  email: String,
  fromWhere: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course"
    // required:true
  },
  address: String,
  phone: {
    type: String,
    required: true
  },
  DoE: {
    type: Date,
    required: true
  }
});

registerSchema.plugin(paginate);

register = mongoose.model("registration", registerSchema);

module.exports = register;
