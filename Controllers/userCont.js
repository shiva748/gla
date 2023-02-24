const Usr = require("../Database/Models/users");
const validator = require("validator");
const { MongooseError } = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
var randomstring = require("randomstring");
const { error } = require("console");

// === === === home === === === //

exports.home = async (req, res) => {
  res.json({ result: true, message: "welcome to our api" });
};

// === === === singup === === === //

exports.user_singup = async (req, res) => {
  try {
    const { fullName, email, password, confirmpass } = req.body;
    if (password !== confirmpass || !validator.isStrongPassword(password)) {
      if (password !== confirmpass) {
        return res.status(400).json({
          result: false,
          error: "Password and Confirm password must be same",
        });
      } else {
        return res
          .status(400)
          .json({ result: false, error: "Please enter a strong Password" });
      }
    } else if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ result: false, error: "Please enter a valid email" });
    }
    const user = new Usr({
      fullName,
      eml: email,
      password,
    });
    const result = await user.save();
    return res
      .status(201)
      .json({ result: true, message: "You have been registered successfully" });
  } catch (err) {
    if (err.name === "TypeError") {
      return res
        .status(400)
        .json({ result: false, error: "Please fill all the required field's" });
    } else if (err.name === "MongoServerError") {
      if (err.code === 11000) {
        const dat = Object.keys(err.keyValue)[0];
        const cop =
          dat === "eml"
            ? "Email already registered"
            : dat === "mbno"
            ? "Phone No already in use"
            : "University roll Number already registerd with another profile";
        return res.status(409).json({ result: false, error: cop });
      }
    } else if (err.name === "ValidationError") {
      const cop = err.errors.fullName
        ? err.errors.fullName.properties.message
        : "Invalid Profile Type";
      return res.status(400).json({ result: false, error: cop });
    } else {
      console.log(err);
      return res.status(500).json({ result: false, error: "some error" });
    }
  }
};

// === === === login === === === //

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ result: false, error: "Please enter a valid email" });
    } else if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ result: false, error: "Please enter a valid password" });
    }
    let regex = new RegExp(["^", email, "$"].join(""), "i");
    const profile = await Usr.findOne({ eml: regex })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return false;
      });
    if (profile) {
      const comparison = await bcrypt.compare(password, profile.password);
      if (comparison) {
        const token = await profile
          .genrateAuth(profile)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return false;
          });
        if (token) {
          return res
            .status(200)
            .cookie("ltk", token, {
              expires: new Date(Date.now() + 432000000),
              httpOnly: true,
            })
            .json({ result: true, data: { fullName: profile.fullName, email: profile.eml }});
        } else {
          return res
            .status(500)
            .json({ result: false, error: "failed to fetch data" });
        }
      }
    } else {
      return res
        .status(400)
        .json({ result: false, error: "Please check your email and password" });
    }
  } catch (err) {
    if (err.name === "TypeError") {
      console.log(err);
      return res
        .status(400)
        .json({ result: false, error: "Please fill all the required field's" });
    } else {
      res.status(500).json({ result: false, error: "Some error occcured" });
    }
  }
};

// === === === profile === === === //

exports.autolog = async (req, res) => {
  const { fullName, eml } = req.user;
  res.json({ result: true, data: { email: eml, Name: fullName } });
};

// === === === change password === === == //

exports.change_pass = async (req, res) => {
  try {
    const { pas, npas, ncpas } = req.body;
    const { password, eml } = req.user;
    if (npas !== ncpas) {
      throw new Error({
        status: 400,
        message: "password and confrm password must be same",
      });
    } else if (!validator.isStrongPassword(npas)) {
      throw new Error({
        status: 400,
        message: "Please enter a strong password",
      });
    }
    const compare = await bcrypt.compare(pas, password);
    if (compare) {
      const hashpass = await bcrypt.hash(npas, 12);
      const update = await Usr.updateOne(
        { eml },
        { password: hashpass, tokens: [] }
      )
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new Error({ status: 500, message: "Some error occured" });
        });
      res.status(202).json({
        result: true,
        message:
          "password updated successfully you are logged out from every device",
      });
    } else {
      throw new Error("the password you have entered was incorrect");
    }
  } catch (error) {
    res
      .status(error.message.status)
      .json({ result: false, error: error.message.message });
  }
};

exports.profile_pic = async (req, res) => {
  try {
    const user = req.user;
    const { imagedata } = req.body;
    const name = randomstring.generate(15);
    if (
      !fs.existsSync(
        path.join(__dirname, `../public/user/${user._id}/profile/`)
      )
    ) {
      if (!fs.existsSync(path.join(__dirname, `../public/user/${user._id}/`))) {
        fs.mkdirSync(path.join(__dirname, `../public/user/${user._id}/`));
      }
      fs.mkdirSync(path.join(__dirname, `../public/user/${user._id}/profile/`));
    }
    let paths = `../public/user/${user._id}/profile/`;
    var matches = imagedata.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      throw new Error ("invalid image");
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], "base64");
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    if (!["JPEG", "JPG", "PNG"].includes(extension.toUpperCase())) {
      throw new Error("Invalid image extension");
    }
    let fileName = `${name}.` + extension;
    fs.writeFileSync(
      path.join(__dirname, paths, fileName),
      imageBuffer,
      "utf8"
    );
    const update = await Usr.updateOne(
      { eml: user.eml },
      { profile: fileName }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return res
      .status(201)
      .json({ result: true, message: "successfully uploaded" });
  } catch (error) {
    res
      .status(400)
      .json({ result: false, error: error.message});
  }
};

exports.send_profile = async(req, res)=>{
  var user = req.user;
  let options = {
    root: path.join(
      __dirname,
      `../public/user/${user._id}/profile`
    ),
  };
  let fileName = user.profile
  if (
    !fileName ||
    !fs.existsSync(
      path.join(
        __dirname,
        `../public/user/${user._id}/profile`,
        fileName
      )
    )
  ) {
    options = {
      root: path.join(__dirname, "../public/user/default/"),
    };
    fileName = "pic.png";
  }
  res.sendFile(fileName, options);
}