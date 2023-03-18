const jwt = require("jsonwebtoken");
const Usr = require("../Database/Models/users");

const verify = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.cookies.ltk;
    if (!token) {
      return res
        .status(400)
        .json({ result: false, error: "No token provided" });
    }
    const match = jwt.verify(token, process.env.KEY);
    if (!match) {
      return res.status(500).json({ result: false, error: "Invalid Token" });
    }
    const isuser = await Usr.findOne({
      _id: match._id,
      "tokens.token": token,
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return false;
      });

    if (isuser) {
      if (isuser.verified) {
        req.token = token;
        req.user = isuser;
        req.body = data;
        next();
      } else {
        return res
          .status(400)
          .clearCookie("ltk")
          .json({ result: false, error: "Invalid Request" });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res
      .status(403)
      .clearCookie("ltk")
      .json({ result: false, error: "Invalid Token" });
  }
};
module.exports = verify;
