module.exports.isMember = (req, res, next) => {
  if (
    (req.isAuthenticated() && req.user.membership === "member") ||
    (req.isAuthenticated() && req.user.admin)
  ) {
    next();
  } else {
    res.status(401).render("error", {
      message: "You are not authorized to view this page",
      error: { status: 401, stack: "You are not a member of this club" },
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).render("error", {
      message: "You are not authorized to view this page",
      error: { status: 401, stack: "You are not an Admin member" },
    });
  }
};
