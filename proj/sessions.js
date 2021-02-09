const session = require("express-session");

module.exports = session({
  secret: "!PrOjEcT",
  resave: false,
  saveUninitialized: true
});
