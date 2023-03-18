const Usr = require("../Database/Models/users");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
var randomstring = require("randomstring");
const Post = require("../Database/Models/post");
const uniqid = require("uniqid");
const FRQ = require("../Database/Models/frq");
const OTP = require("../Database/Models/otp");
const axios = require("axios");
const Event = require("../Database/Models/eve");
const Job = require("../Database/Models/job");
const { isDate } = require("util/types");
const { default: isURL } = require("validator/lib/isURL");
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
      verified: true,
      stats: {
        follower: 0,
        follow: 0,
      },
      followers: [],
      follows: [],
    });
    const result = await user
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return res
      .status(201)
      .json({ result: false, message: "Registration successfull" });
    // // === === === sending otp === === === //
    // function generateOTP() {
    //   var digits = "0123456789";
    //   let OTP = "";
    //   for (let i = 0; i < 6; i++) {
    //     OTP += digits[Math.floor(Math.random() * 10)];
    //   }
    //   return OTP;
    // }
    // const otp = generateOTP();
    // const date = new Date().getTime();
    // const otpreq = new OTP({
    //   eml: email,
    //   code: otp,
    //   expiry: date + 300 * 1000,
    //   type: "registration",
    //   createdon: date,
    //   resend: {
    //     on: date,
    //     count: 0,
    //   },
    //   attempt: 1,
    // });
    // const sresult = await otpreq
    //   .save()
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    //   });
    // let data = {
    //   to: [
    //     {
    //       name: fullName,
    //       email: email,
    //     },
    //   ],
    //   from: {
    //     name: "Proconnect",
    //     email: "info@z29bm8.mailer91.com",
    //   },
    //   domain: "z29bm8.mailer91.com",
    //   mail_type_id: "1",
    //   reply_to: [
    //     {
    //       email: "shivagautam2002@gmail.com",
    //     },
    //   ],
    //   template_id: "Eml_verification",
    //   variables: {
    //     NAME: fullName,
    //     COMN: "Proconnect",
    //     OTP: `${otp}`,
    //     WEB: "www.proconnect.com",
    //     WMAIL: "Info@proconnect.com",
    //   },
    // };
    // const customConfig = {
    //   headers: {
    //     "Content-Type": "application/JSON",
    //     Accept: "application/json",
    //     authkey: process.env.MSG91,
    //   },
    // };
    // const emailreq = axios
    //   .post("https://api.msg91.com/api/v5/email/send", data, customConfig)
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
    // return res
    //   .status(201)
    //   .json({ result: true, message: "an otp has been sent to your email" });
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
            : "Phone No already in use";
        return res.status(409).json({ result: false, error: cop });
      }
    } else if (err.name === "ValidationError") {
      const cop = err.errors.fullName
        ? err.errors.fullName.properties.message
        : "Invalid Profile Type";
      return res.status(400).json({ result: false, error: cop });
    } else {
      return res
        .status(500)
        .json({ result: false, error: "some error occured" });
    }
  }
};

// === === === verify profile === === === //

exports.verify_profile = async (req, res) => {
  try {
    let { otp, email } = req.body;
    let regex = new RegExp(["^", email, "$"].join(""), "i");
    const isotp = await OTP.findOne({ eml: email, type: "registration" })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    if (isotp.code !== otp) {
      return res.status(400).json({ result: false, message: "Invalid otp" });
    } else if (isotp.expiry < new Date().getTime()) {
      return res.status(400).json({ result: false, message: "Otp expired" });
    } else {
      const update = await Usr.updateOne({ eml: regex }, { verified: true })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });

      const profile = await Usr.findOne({ eml: regex })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        });
      const token = await profile
        .genrateAuth(profile)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        });
      if (token) {
        res
          .status(200)
          .cookie("ltk", token, {
            expires: new Date(Date.now() + 432000000),
            httpOnly: true,
          })
          .json({
            result: true,
            data: {
              Name: profile.fullName,
              email: profile.eml,
              userid: profile.userid,
            },
            message: "Profile Verification was successfull",
          });
      } else {
        res.status(500).json({ result: false, error: "failed to fetch data" });
      }
      const dotp = OTP.deleteMany({ eml: email, type: "registration" })
        .then((res) => {
          return res;
        })
        .catch((err) => {});
    }
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
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
        if (!profile.verified) {
          const dotp = await OTP.deleteMany({
            eml: profile.eml,
            type: "registration",
          })
            .then((res) => {
              return res;
            })
            .catch((err) => {
              throw new Error(err);
            });
          function generateOTP() {
            var digits = "0123456789";
            let OTP = "";
            for (let i = 0; i < 6; i++) {
              OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
          }
          const otp = generateOTP();
          const date = new Date().getTime();
          const otpreq = new OTP({
            eml: profile.eml,
            code: otp,
            expiry: date + 300 * 1000,
            type: "registration",
            createdon: date,
            resend: {
              on: date,
              count: 0,
            },
            attempt: 1,
          });
          const sresult = await otpreq
            .save()
            .then((res) => {
              return res;
            })
            .catch((error) => {
              throw new Error(error);
            });
          let data = {
            to: [
              {
                name: profile.fullName,
                email: profile.eml,
              },
            ],
            from: {
              name: "Proconnect",
              email: "info@z29bm8.mailer91.com",
            },
            domain: "z29bm8.mailer91.com",
            mail_type_id: "1",
            reply_to: [
              {
                email: "shivagautam2002@gmail.com",
              },
            ],
            template_id: "Eml_verification",
            variables: {
              NAME: profile.fullName,
              COMN: "Proconnect",
              OTP: `${otp}`,
              WEB: "www.proconnect.com",
              WMAIL: "Info@proconnect.com",
            },
          };
          const customConfig = {
            headers: {
              "Content-Type": "application/JSON",
              Accept: "application/json",
              authkey: process.env.MSG91,
            },
          };
          const emailreq = await axios
            .post("https://api.msg91.com/api/v5/email/send", data, customConfig)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              throw new Error(err);
            });
          return res.status(200).json({
            result: true,
            message: "an otp has been sent to your email",
            vrftn_req: true,
          });
        } else {
          const token = await profile
            .genrateAuth(profile)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw new Error(err);
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
                message: "login successfully",
                vrftn_req: false,
                data: {
                  Name: profile.fullName,
                  email: profile.eml,
                  userid: profile.userid,
                },
              });
          } else {
            return res
              .status(500)
              .json({ result: false, message: "failed to fetch data" });
          }
        }
      }
    } else {
      return res.status(400).json({
        result: false,
        message: "Please check your email and password",
      });
    }
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError") {
      return res.status(400).json({
        result: false,
        message: "Please fill all the required field's",
      });
    } else {
      res.status(500).json({ result: false, message: "Some error occcured" });
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
      throw new Error({
        status: 400,
        message: "the password you have entered was incorrect",
      });
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
    if (
      !["jpg", "jpeg", "png", "gif", "webp", "svg"].some(
        (itm) => itm == filename.split(".")[1].toLowerCase()
      )
    ) {
      return res.status(400).json({ result: false, message: "invalid image" });
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

exports.cover = async (req, res) => {
  try {
    const user = req.user;
    const filename = req.files.cover.name;
    const file = req.files.cover;
    if (
      !fs.existsSync(
        path.join(__dirname, `../public/user/${user.userid}/cover/`)
      )
    ) {
      if (
        !fs.existsSync(path.join(__dirname, `../public/user/${user.userid}/`))
      ) {
        fs.mkdirSync(path.join(__dirname, `../public/user/${user.userid}/`));
      }
      fs.mkdirSync(
        path.join(__dirname, `../public/user/${user.userid}/cover/`)
      );
    }
    if (
      !["jpg", "jpeg", "png", "gif", "webp", "svg"].some(
        (itm) => itm == filename.split(".")[1].toLowerCase()
      )
    ) {
      return res.status(400).json({ result: false, message: "invalid image" });
    }
    let name = (await randomstring.generate(15)) + "." + filename.split(".")[1];
    let paths = __dirname + `/../public/user/${user.userid}/cover/` + name;

    file.mv(paths, (err) => {
      if (err) {
        return res.send(err);
      }
    });
    const update = await Usr.updateOne({ eml: user.eml }, { cover: name })
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
  try {
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
  } catch (error) {
    res.status(400).json("some error occured");
  }
};

exports.send_pp = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json("some error occured");
  }
};

exports.send_co = async (req, res) => {
  try {
    var id = req.params.userid;
    const user = await Usr.findOne(
      { userid: id },
      { cover: 1, _id: 0, userid: 1 }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    let options = {
      root: path.join(__dirname, `../public/user/${user.userid}/cover`),
    };
    let fileName = user.cover;
    if (
      !fileName ||
      !fs.existsSync(
        path.join(__dirname, `../public/user/${user.userid}/cover`, fileName)
      )
    ) {
      options = {
        root: path.join(__dirname, "../public/user/default/"),
      };
      fileName = "pic.png";
    }
    res.sendFile(fileName, options);
  } catch (error) {
    res.status(400).json("some error occured");
  }
};

exports.send_cp = async (req, res) => {
  try {
    const user = req.user;
    let options = {
      root: path.join(__dirname, `../public/user/${user.userid}/cover`),
    };
    let fileName = user.cover;
    if (
      !fileName ||
      !fs.existsSync(
        path.join(__dirname, `../public/user/${user.userid}/cover`, fileName)
      )
    ) {
      options = {
        root: path.join(__dirname, "../public/user/default/"),
      };
      fileName = "pic.png";
    }
    res.sendFile(fileName, options);
  } catch (error) {
    res.status(400).json("some error occured");
  }
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
      if (
        !["jpg", "jpeg", "png", "gif", "webp", "svg"].some(
          (itm) => itm == filename.split(".")[1].toLowerCase()
        )
      ) {
        return res
          .status(400)
          .json({ result: false, message: "invalid image" });
      }
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
    if (!data.text && !req.files) {
      throw new Error("Invalid request");
    }
    let obj = {
      postid: uniqid("post-"),
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
    return res.status(201).json({ result: true, post: obj });
  } catch (error) {
    res.status(400).json({ result: false, error: error.message });
  }
};

exports.getposts = async (req, res) => {
  try {
    let records = await Post.aggregate([
      {
        $sample: { size: 20 },
      },
    ])
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
      .sort({ $natural: -1 })
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

exports.send_frq = async (req, res) => {
  try {
    const user = req.user;
    const { userid } = req.body;
    const isuser = await Usr.findOne({
      userid,
    })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    if (isuser) {
      if (isuser.followers.some((itm) => itm.userid === user.userid)) {
        let followers = isuser.followers.filter(
          (itm) => itm.userid !== user.userid
        );
        let stats = isuser.stats;
        stats.follower -= 1;
        const upou = await Usr.updateOne({ userid }, { stats, followers })
          .then((res) => res)
          .catch((err) => {
            throw new Error(err);
          });
        let follows = user.follows.filter((itm) => itm.userid != userid);
        stats = user.stats;
        stats.follow -= 1;
        const upu = await Usr.updateOne(
          { userid: user.userid },
          { stats, follows }
        )
          .then((res) => res)
          .catch((err) => {
            throw new Error(err);
          });
        return res.status(200).json({ result: true, message: "unfollowed" });
      } else {
        let followers = isuser.followers;
        followers.push({
          userid: user.userid,
          fullName: user.fullName,
        });
        const upou = await Usr.updateOne(
          { userid },
          { "stats.follower": isuser.stats.follower + 1, followers }
        )
          .then((res) => res)
          .catch((err) => {
            throw new Error(err);
          });
        follows = user.follows;
        follows.push({ userid, fullName: isuser.fullName });
        stats = user.stats;
        const upu = await Usr.updateOne(
          { userid: user.userid },
          { "stats.follow": user.stats.follow + 1, follows }
        )
          .then((res) => res)
          .catch((err) => {
            throw new Error(err);
          });
        return res.status(200).json({ result: true, message: "followed" });
      }
    } else {
      throw new Error("Invalid user id");
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ result: false, message: "friend request already sent" });
    } else {
      return res.status(400).json(error.message);
    }
  }
};
exports.lst_frq = async (req, res) => {
  try {
    const user = req.user;
    const Frq = await FRQ.find({ "to.userid": user.userid })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    res.status(200).json({ result: true, data: Frq });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.user.tokens;
    const filtered = token.filter((itm) => {
      return itm.token !== req.token;
    });
    const dt = await Usr.updateOne({ eml: req.user.eml }, { tokens: filtered })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(err);
      });
    res.clearCookie("ltk").json({ message: "logged out successfully" });
  } catch (error) {
    res.clearCookie("ltk").json({ message: "logged out successfully" });
  }
};

exports.delete_post = async (req, res) => {
  try {
    const { postid } = req.body;
    const user = req.user;
    const resu = await Post.deleteOne({ userid: user.userid, postid })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    res
      .status(200)
      .json({ result: true, message: "post deleted successfully" });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.like_post = async (req, res) => {
  try {
    const user = req.user;
    const { postid } = req.body;
    const pst = await Post.findOne({ postid })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    let edt = pst.likes;
    let obj, actn;
    if (edt.some((itm) => itm.userid == user.userid)) {
      edt = edt.filter((itm) => itm.userid !== user.userid);
      obj = {
        "stats.likes": pst.stats.likes - 1,
        likes: edt,
      };
      actn = "disliked";
    } else {
      edt.push({
        fullName: user.fullName,
        userid: user.userid,
        on: new Date(),
      });
      obj = {
        "stats.likes": pst.stats.likes + 1,
        likes: edt,
      };
      actn = "liked";
    }

    const update = await Post.updateOne({ postid }, obj)
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    return res.status(200).json({ result: true, message: actn });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

exports.crt_eve = async (req, res) => {
  try {
    const { fullName, userid } = req.user;
    const { text, date_time, location, type, registration, lnk } = JSON.parse(
      req.body.data
    );
    if (!text) {
      throw new Error("please input required fields");
    }
    if (!isDate(new Date(date_time))) {
      throw new Error("Please enter a valid date & time");
    } else if (!["gathering", "competition"].some((itm) => itm == type)) {
      throw new Error("Invalid event type selected");
    } else if (![false, true].some((itm) => itm == registration)) {
      throw new Error("Invalid request");
    } else if (registration) {
      if (!isURL(lnk)) {
        throw new Error("please enter a valid Registration link");
      }
    }
    let obj = {
      eveid: uniqid("eve-"),
      text,
      fullName,
      userid,
      location,
      date_time,
      type,
      registration,
      lnk,
      on: new Date(),
    };
    if (req.files) {
      const image = req.files.image;
      const filename =
        randomstring.generate(15) + "." + req.files.image.name.split(".")[1];
      obj = {
        ...obj,
        Media: [
          {
            MDT: "T1",
            url: filename,
          },
        ],
      };
      if (!fs.existsSync(path.join(__dirname, `../public/events`))) {
        fs.mkdirSync(path.join(__dirname, `../public/events`));
      }
      if (
        !["jpg", "jpeg", "png", "gif", "webp", "svg"].some(
          (itm) => itm == filename.split(".")[1].toLowerCase()
        )
      ) {
        return res
          .status(400)
          .json({ result: false, message: "invalid image" });
      }
      let paths = __dirname + `/../public/events/` + filename;

      image.mv(paths, (err) => {
        if (err) {
          return res.send(err);
        }
      });
    }
    const evnt = new Event(obj);
    const save = await evnt
      .save()
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    return res
      .status(201)
      .json({ result: true, message: "Event shared successfully", data: obj });
  } catch (err) {
    if (err.name === "TypeError") {
      return res
        .status(400)
        .json({ result: false, error: "Please fill all the required field's" });
    } else {
      return res.status(500).json({ result: false, message: err.message });
    }
  }
};

// === === === send events === === === //

exports.get_event = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ $natural: -1 })
      .then((res) => res)
      .catch((err) => {
        throw new Error("some error occured");
      });
    return res.status(200).json({ result: true, data: events });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.send_evec = async (req, res) => {
  try {
    var url = req.params.url;
    let options = {
      root: path.join(__dirname, `../public/events`),
    };
    if (!url) {
      throw new Error("Invalid Request");
    } else if (!fs.existsSync(path.join(__dirname, `../public/events`, url))) {
      throw new Error("Not Found");
    }
    res.sendFile(url, options);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
exports.opdtl = async (req, res) => {
  try {
    const { userid } = req.body;
    const isusr = await Usr.findOne(
      { userid },
      { password: 0, eml: 0, verified: 0, tokens: 0 }
    )
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    if (isusr) {
      return res.status(200).json({ result: true, data: isusr });
    } else {
      throw new Error("Invalid userid");
    }
  } catch (error) {
    return res.status(400).json({ result: false, message: error.message });
  }
};

// === === === delete event === === === //

exports.delete_event = async (req, res) => {
  try {
    const { eveid } = req.body;
    const user = req.user;
    const resu = await Event.deleteOne({ userid: user.userid, eveid })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    res
      .status(200)
      .json({ result: true, message: "event deleted successfully" });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

// === === === jobs === === === //

exports.crt_jobs = async (req, res) => {
  try {
    const { fullName, userid } = req.user;
    const { text, company, post, application, email } = JSON.parse(
      req.body.data
    );
    if (!text || !company || !post || !application) {
      throw new Error("please enter all the fields");
    }
    if (!isURL(application)) {
      throw new Error("please enter a valid application link");
    }
    let obj = {
      fullName,
      userid,
      jobid: uniqid("job-"),
      text,
      company,
      post,
      application,
      email,
      on: new Date(),
    };
    if (req.files) {
      const image = req.files.image;
      const filename =
        randomstring.generate(15) + "." + req.files.image.name.split(".")[1];
      obj = {
        ...obj,
        Media: [
          {
            MDT: "T1",
            url: filename,
          },
        ],
      };
      if (!fs.existsSync(path.join(__dirname, `../public/jobs`))) {
        fs.mkdirSync(path.join(__dirname, `../public/jobs`));
      }
      if (
        !["jpg", "jpeg", "png", "gif", "webp", "svg"].some(
          (itm) => itm == filename.split(".")[1].toLowerCase()
        )
      ) {
        return res
          .status(400)
          .json({ result: false, message: "invalid image" });
      }
      let paths = __dirname + `/../public/jobs/` + filename;
      image.mv(paths, (err) => {
        if (err) {
          return res.send(err);
        }
      });
    }
    const job = new Job(obj);
    const save = await job
      .save()
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    return res.status(201).json({
      result: true,
      message: "job opportunity shared successfully",
      data: obj,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError") {
      return res
        .status(400)
        .json({ result: false, error: "Please fill all the required field's" });
    } else {
      return res.status(400).json({ result: false, message: err.message });
    }
  }
};

exports.getjobs = async (req, res) => {
  try {
    let records = await Job.aggregate([
      {
        $sample: { size: 20 },
      },
    ])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
    res.status(200).json({ result: true, job: records });
  } catch (error) {
    res.status(400).json({ result: false, message: "some error occured" });
  }
};

// === === === send job content === === === //

exports.send_jobc = async (req, res) => {
  try {
    var url = req.params.url;
    let options = {
      root: path.join(__dirname, `../public/jobs`),
    };
    if (!url) {
      throw new Error("Invalid Request");
    } else if (!fs.existsSync(path.join(__dirname, `../public/jobs`, url))) {
      throw new Error("Not Found");
    }
    res.sendFile(url, options);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};