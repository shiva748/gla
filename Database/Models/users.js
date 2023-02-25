const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usr = new mongoose.Schema({
  userid:{
    type:String,
    require:true,
    unique:true,
  },
  eml: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Name must have two characters"],
    maxLength: [50, "Name can't be greater then 50 character"],
  },
  password: {
    type: String,
    required: true,
  },
  registeredon: {
    type: Date,
    default: Date.now(),
  },
  tokens: [
    {
      token: {
        type: String,
      },
      expire: {
        type: Number,
      },
    },
  ],
  Records: {
    date: {
      type: String,
    },
    failed: {
      type: Number,
    },
    block: {
      type: Boolean,
    },
  },
  profile: {
    type: String,
  },
  path: {
    type: String,
  },
});

// === === === hashing password while registring a new usr === === === //

usr.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashpass = await bcrypt.hash(this.password, 12);
    this.password = hashpass;
  }
  next();
});

usr.methods.genrateAuth = async (profile) => {
  try {
    let token = jwt.sign({ _id: profile._id }, process.env.KEY, {
      expiresIn: "432000 seconds",
    });
    profile.tokens = profile.tokens.concat({
      token: token,
      expire: new Date().getTime() + 432000000,
    });
    await profile.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Usr = new mongoose.model("User", usr);
module.exports = Usr;
