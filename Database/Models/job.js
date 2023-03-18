const mongoose = require("mongoose");

const job = new mongoose.Schema({
  jobid: { type: String, require: true, unique: true },
  userid: { type: String, require: true },
  fullName: { type: String, require: true },
  text: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  application: {
    type: String,
  },
  Media: [
    {
      MDT: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
});

const Job = new mongoose.model("Job", job);
module.exports = Job;
