const mongoose = require("mongoose");

const post = new mongoose.Schema({
  postid: { type: String, require: true, unique: true },
  userid: { type: String, require: true },
  fullName: { type: String, require: true },
  text: {
    type: String,
    require: true,
  },

  comments: [
    {
      fullName: { type: String, require: true },
      userid: { type: String, require: true },
      comment: { type: String, require: true },
      on: {
        type: Date,
        require: true,
      },
    },
  ],
  stats: {
    likes: {
      type: Number,
      require: true,
    },
    comments: {
      type: Number,
      require: true,
    },
  },

  likes: [
    {
      fullName: { type: String, require: true },
      userid: {
        type: String,
        require: true,
      },
      on: {
        type: Date,
        require: true,
      },
    },
  ],
  on: {
    type: Date,
    require: true,
  },
  visiblity: {
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

const Post = new mongoose.model("POST", post);
module.exports = Post;
