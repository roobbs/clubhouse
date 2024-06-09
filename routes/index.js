var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userCotroller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Express" });
});

router.post("/sign-up", user_controller.signup_user_post);

module.exports = router;
