const Usr = require("../Database/Models/users");
const validator = require("validator");
const { MongooseError } = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
var randomstring = require("randomstring");
const { error } = require("console");
const Post = require("../Database/Models/post");
const uniqid = require("uniqid");

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
      userid: uniqid(),
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
            .json({
              result: true,
              data: {
                fullName: profile.fullName,
                email: profile.eml,
                userid: profile.userid,
              },
            });
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
  const { fullName, eml, userid } = req.user;
  res.json({
    result: true,
    data: { email: eml, Name: fullName, userid: userid },
  });
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
    const filename = req.files.profile.name;
    const file = req.files.profile;
    if (
      !fs.existsSync(
        path.join(__dirname, `../public/user/${user.userid}/profile/`)
      )
    ) {
      if (
        !fs.existsSync(path.join(__dirname, `../public/user/${user.userid}/`))
      ) {
        fs.mkdirSync(path.join(__dirname, `../public/user/${user.userid}/`));
      }
      fs.mkdirSync(
        path.join(__dirname, `../public/user/${user.userid}/profile/`)
      );
    }
    let name = (await randomstring.generate(15)) + "." + filename.split(".")[1];
    let paths = __dirname + `/../public/user/${user.userid}/profile/` + name;

    file.mv(paths, (err) => {
      if (err) {
        return res.send(err);
      }
    });
    const update = await Usr.updateOne({ eml: user.eml }, { profile: name })
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
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.send_po = async (req, res) => {
  var id = req.params.userid;
  const user = await Usr.findOne(
    { userid: id },
    { profile: 1, _id: 0, userid: 1 }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });
  let options = {
    root: path.join(__dirname, `../public/user/${user.userid}/profile`),
  };
  let fileName = user.profile;
  if (
    !fileName ||
    !fs.existsSync(
      path.join(__dirname, `../public/user/${user.userid}/profile`, fileName)
    )
  ) {
    options = {
      root: path.join(__dirname, "../public/user/default/"),
    };
    fileName = "pic.png";
  }
  res.sendFile(fileName, options);
};

exports.send_pp = async (req, res) => {
  const user = req.user;
  let options = {
    root: path.join(__dirname, `../public/user/${user.userid}/profile`),
  };
  let fileName = user.profile;
  if (
    !fileName ||
    !fs.existsSync(
      path.join(__dirname, `../public/user/${user.userid}/profile`, fileName)
    )
  ) {
    options = {
      root: path.join(__dirname, "../public/user/default/"),
    };
    fileName = "pic.png";
  }
  res.sendFile(fileName, options);
};

exports.post = async (req, res) => {
  try {
    const user = req.user;
    if (req.files) {
      const file = req.files.file;
      if (
        !fs.existsSync(
          path.join(__dirname, `../public/user/${user.userid}/post/`)
        )
      ) {
        if (
          !fs.existsSync(path.join(__dirname, `../public/user/${user.userid}/`))
        ) {
          fs.mkdirSync(path.join(__dirname, `../public/user/${user.userid}/`));
        }
        fs.mkdirSync(
          path.join(__dirname, `../public/user/${user.userid}/post/`)
        );
      }
      const filename = req.files.file.name;
      var name =
        (await randomstring.generate(15)) + "." + filename.split(".")[1];
      let paths = __dirname + `/../public/user/${user.userid}/post/` + name;

      file.mv(paths, (err) => {
        if (err) {
          return res.send(err);
        }
      });
    }
    const data = JSON.parse(req.body.data);
    let obj = {
      userid: user.userid,
      fullName: user.fullName,
      text: data.text,
      stats: {
        likes: 0,
        comments: 0,
      },
      on: new Date(),
      visiblity: "Public",
      likes: [],
      comments: [],
    };
    if (req.files) {
      obj = {
        ...obj,
        Media: [
          {
            MDT: "T1",
            url: name,
          },
        ],
      };
    }
    const pst = new Post(obj);
    const save = await pst
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return res
      .status(201)
      .json({ result: true, message: "Posted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: false, error: "some error occured" });
  }
};

exports.getposts = async (req, res) => {
  try {
    let records = await Post.find()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    res.status(200).json({ result: true, post: records });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.getpostsp = async (req, res) => {
  try {
    const userid = req.params.userid;
    let records = await Post.find({ userid: userid })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    res.status(200).json({ result: true, post: records });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.send_content = async (req, res) => {
  try {
    const userid = req.params.userid;
    const contentname = req.params.contentname;
    if (
      !fs.existsSync(
        path.join(__dirname, `../public/user/${userid}/post/${contentname}`)
      )
    ) {
      return res
        .status(400)
        .json({ result: false, message: "invalid request" });
    }
    let options = {
      root: path.join(__dirname, `../public/user/${userid}/post`),
    };
    res.sendFile(contentname, options);
  } catch (error) {
    res.status(400).json({ result: false, message: "invalid request" });
  }
};
