const express = require("express");
const Routers = express.Router();

// === === === importing controller === === === //
const usercont = require("../Controllers/userCont")

// === === === middleware === === === //

const authenticate = require("../Middleware/auth")

// === === === cookie extractor === === === //

const cookie = require("cookie-parser")
Routers.use(cookie())

// === ==== === routes === === === //

Routers.get("/", usercont.home)

Routers.post("/login", usercont.login)

Routers.post("/register", usercont.user_singup)

Routers.get("/checkls", authenticate, usercont.autolog)

Routers.post("/changepass", authenticate, usercont.change_pass)

Routers.post("/profilepic",authenticate, usercont.profile_pic)

Routers.get("/profilepic", authenticate, usercont.send_profile)

module.exports = Routers