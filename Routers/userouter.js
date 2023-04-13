const express = require("express");
const Routers = express.Router();

// === === === importing controller === === === //
const usercont = require("../Controllers/userCont");

// === === === middleware === === === //

const authenticate = require("../Middleware/auth");

// === === === cookie extractor === === === //

const cookie = require("cookie-parser");
const { Router } = require("express");
Routers.use(cookie());

// === ==== === routes === === === //

Routers.get("/", usercont.home);

Routers.post("/login", usercont.login);

Routers.post("/register", usercont.user_singup);

Routers.post("/register/verify", usercont.verify_profile);

Routers.get("/checkls", authenticate, usercont.autolog);

Routers.post("/changepass", authenticate, usercont.change_pass);

Routers.post("/profilepic", authenticate, usercont.profile_pic);

Routers.post("/cover", authenticate, usercont.cover);

Routers.get("/profilepic", authenticate, usercont.send_pp);

Routers.get("/profilepic/:userid", usercont.send_po);

Routers.get("/cover", authenticate, usercont.send_cp);

Routers.get("/cover/:userid", usercont.send_co);

Routers.post("/share_post", authenticate, usercont.post);

Routers.post("/posts", authenticate, usercont.getposts);

Routers.post("/posts/:userid", authenticate, usercont.getpostsp);

Routers.get(
  "/content/:userid/:contentname",
  authenticate,
  usercont.send_content
);

Routers.post("/usr/frq", authenticate, usercont.send_frq);

Routers.get("/usr/gtfrq", authenticate, usercont.lst_frq);

Routers.get("/logout", authenticate, usercont.logout);

Routers.post("/post/delete", authenticate, usercont.delete_post);

Routers.post("/post/like", authenticate, usercont.like_post);

Routers.post("/share/event", authenticate, usercont.crt_eve);

Routers.get("/event", authenticate, usercont.get_event);

Routers.get("/event/content/:url", authenticate, usercont.send_evec);

Routers.post("/profile/:userid", authenticate, usercont.opdtl);

Routers.post("/share/job", authenticate, usercont.crt_jobs);

Routers.post("/event/delete", authenticate, usercont.delete_event);

Routers.post("/jobs", authenticate, usercont.getjobs);

Routers.get("/jobs/content/:url", authenticate, usercont.send_jobc);

Routers.post("/chat/new", authenticate, usercont.create_chat);

module.exports = Routers;
