var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Express" });
});

module.exports = router;
