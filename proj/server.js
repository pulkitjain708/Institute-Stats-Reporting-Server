const express = require("express");

const expressLayout = require("express-ejs-layouts");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(require("./sessions"));

app.set("view engine", "ejs");

app.use(expressLayout);

app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

app.use(express.static("public"));

const adminRoutes = require("./routes/admin");

app.use("/admin", adminRoutes);

app.use("/user", require("./routes/user"));

app.use("/paginate", require("./routes/paginate"));

mongoose.connect("mongodb://localhost:27017/project", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/", (req, res) => {
  res.render("index", { data: {}, utype: {}, errors: [] });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("server serving at localhost:8000");
});
