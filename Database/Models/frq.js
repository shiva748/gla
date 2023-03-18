const mongoose = require("mongoose");

const frq = new mongoose.Schema({
  frqid: {
    type: String,
    require: true,
    unique: true,
  },
  from: {
    userid: { type: String, require: true },
    fullName: { type: String, require: true },
    visible: { type: Boolean, require: true },
  },
  to: {
    userid: { type: String, require: true },
    fullName: { type: String, require: true },
    visible: { type: Boolean, require: true },
  },
  on: {
    type: Date,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const FRQ = new mongoose.model("FRQ", frq);
module.exports = FRQ;
