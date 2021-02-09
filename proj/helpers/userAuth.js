module.exports = function(req, res, next) {
  console.log("frgregergheyg ueghuerrghe");
  console.log(req.session.utype);
  if (req.session.utype == 0) {
    console.log("In Auth User ,,,, function");
    return next();
  } else {
    res.redirect("/");
  }
};
