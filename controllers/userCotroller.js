const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signup_user_post = [
  body("username", "Username must not be empty").trim().escape(),
  body("firstname", "First name must not be empty").trim().escape(),
  body("lastname", "Last name must not be empty").trim().escape(),
  body("password", "Password must not be empty").trim().escape(),
  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        errors: errors.array(),
      });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: hashedPassword,
        membership: "member",
      });

      await user.save();
      res.redirect("/log-in");
    } catch (err) {
      console.log(err);
      res.render("sign-up", {
        errors: [{ msg: "There was an unexpected error" }],
      });
    }
  }),
];

exports.login_user_post = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/log-in",
});

exports.get_home = asyncHandler(async (req, res, next) => {
  res.render("home", { user: req.user });
});
