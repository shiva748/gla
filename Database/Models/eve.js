const mongoose = require("mongoose");

const event = new mongoose.Schema({
  eveid: { type: String, require: true, unique: true },
  userid: { type: String, require: true },
  fullName: { type: String, require: true },
  text: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  registration: { type: Boolean, required: true },
  on: {
    type: Date,
    require: true,
  },
  lnk: {
    type: String,
    require: true,
  },
  date_time: {
    type: Date,
    require: true,
  },
  location: {
    type: String,
    require: true,
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

const Event = new mongoose.model("Event", event);
module.exports = Event;
