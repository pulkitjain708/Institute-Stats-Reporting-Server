const mongoose = require("mongoose");

const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  cid: {
    type: String,
    Required: true
  },
  cname: {
    type: String,
    required: true
  },
  fees: {
    type: String
  },
  duration: {
    type: Number
  },
  status: {
    required: true,
    type: Boolean
  },
  count: Number
});

courseSchema.plugin(paginate);

course = mongoose.model("course", courseSchema);

module.exports = course;
