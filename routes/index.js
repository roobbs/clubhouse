var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userCotroller");
const isMember = require("./authMiddleware").isMember;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up", { title: "Express" });
});

router.post("/sign-up", user_controller.signup_user_post);

router.get("/log-in", (req, res, next) => {
  res.render("log-in");
});
router.post("/log-in", user_controller.login_user_post);

router.get("/home", isMember, user_controller.get_home);

router.get("/message", isMember, user_controller.create_message_get);

router.post("/message", isMember, user_controller.create_message_post);

module.exports = router;
