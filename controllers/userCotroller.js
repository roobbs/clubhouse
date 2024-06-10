const User = require("../models/user");
const Message = require("../models/message");
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
  const messages = await Message.find({}).populate("owner").exec();

  res.render("home", { user: req.user, messages: messages });
});

exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render("message", { user: req.user });
});

exports.create_message_post = [
  body("title", "Title must not be empty").trim().escape(),
  body("message", "Message name must not be empty").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message", {
        errors: errors.array(),
      });
      return;
    }

    const message = new Message({
      title: req.body.title,
      timestamp: new Date(),
      text: req.body.message,
      owner: req.user._id,
    });
    console.log(message);
    message.save();
    res.render("home", { user: req.user });
  }),
];
