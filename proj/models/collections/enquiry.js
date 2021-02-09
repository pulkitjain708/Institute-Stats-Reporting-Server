const mongoose = require("mongoose");

const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const enquirySchema = new Schema({
  eid: {
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
  email: {
    type: String,
    required: true
  },
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
  isRegistered: {
    required: true,
    type: Boolean
  },
  DoE: {
    type: Date,
    required: true
  }
});

enquirySchema.plugin(paginate);

entry = mongoose.model("enquirie", enquirySchema);

module.exports = entry;
