const mongoose = require("mongoose");
const otp_req = new mongoose.Schema({
  eml: { type: String, required: true },
  code: { type: String },
  type: { type: String, require: true },
  expiry: { type: Number, required: true },
  createdon: { type: Number, required: true },
  resend: {
    on: { type: Number },
    count: { type: Number },
  },
  attempt: { type: Number },
});
const OTP = new mongoose.model("otp", otp_req);
module.exports = OTP;
