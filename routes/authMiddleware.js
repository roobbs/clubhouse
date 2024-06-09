module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authorized to view this page" });
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership === "member") {
    next();
  } else {
    res.status(401).json({ msg: "You are not authorized to view this page" });
  }
};
