const express = require("express");
const Routers = express.Router();

// === === === importing controller === === === //
const usercont = require("../Controllers/userCont");

// === === === middleware === === === //

const authenticate = require("../Middleware/auth");

// === === === cookie extractor === === === //

const cookie = require("cookie-parser");
Routers.use(cookie());

// === ==== === routes === === === //

Routers.get("/", usercont.home);

Routers.post("/login", usercont.login);

Routers.post("/register", usercont.user_singup);

Routers.get("/checkls", authenticate, usercont.autolog);

Routers.post("/changepass", authenticate, usercont.change_pass);

Routers.post("/profilepic", authenticate, usercont.profile_pic);

Routers.get("/profilepic", authenticate, usercont.send_pp);

Routers.get("/profilepic/:userid", usercont.send_po);

Routers.post("/share_post", authenticate, usercont.post);

Routers.post("/posts", authenticate, usercont.getposts);

Routers.get("/content/:userid/:contentname", authenticate, usercont.send_content)

module.exports = Routers;
