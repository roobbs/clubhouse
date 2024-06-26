var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userCotroller");
const isMember = require("./authMiddleware").isMember;
const isAdmin = require("./authMiddleware").isAdmin;

/* GET home page. */
router.get("/", user_controller.index_get);

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

router.get(
  "/upgrade-membership",
  isMember,
  user_controller.upgrade_membership_get
);
router.post(
  "/upgrade-membership",
  isMember,
  user_controller.upgrade_membership_post
);

router.post(
  "/message/:id",
  isMember,
  isAdmin,
  user_controller.message_delete_post
);

module.exports = router;
