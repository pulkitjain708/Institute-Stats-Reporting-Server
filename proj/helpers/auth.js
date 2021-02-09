module.exports = function(req, res, next) {
  if (req.session.utype == 1) {
    return next();
  } else {
    res.redirect("/");
  }
};
