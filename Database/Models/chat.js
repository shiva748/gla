const mongoose = require("mongoose");

const chat = new mongoose.Schema({
  chatid: { type: String, require: true, unique: true },
  users: [
    {
      userid: {
        type: String,
        require: true,
      },
      fullName: {
        type: String,
        require: true,
      },
    },
  ],

  on: {
    type: Date,
    require: true,
  },
  Message: [
    {
      userid: {
        type: String,
        require: true,
      },
      message: {
        type: String,
        require: true,
      },
    },
  ],
});

const Chat = new mongoose.model("Chat", chat);
module.exports = Chat;
