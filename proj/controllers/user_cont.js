const { entry } = require("../models/index");
const { validationResult } = require("express-validator");
const d = require("../helpers/date")();
let s = require("../helpers/s")();
const { edit, save } = require("../services/crud");
let { enquired, registered } = require("../services/templates");

exports.renderNavbar = (req, res) => {
  res.render("navbar", {
    data: req.session.data,
    utype: req.session.utype
  });
};

exports.getReports = (req, res) => {
  res.render("ureps", {
    data: req.session.data,
    utype: req.session.utype,
    errors: null
  });
}

exports.renderAddEnquiry = (req, res) => {
  res.render("staff_add_enquiry", {
    data: req.session.data,
    utype: req.session.utype,
    errors: null
  });
};

exports.postAddEnquiry = (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    return res.render("enquiry", {
      data: req.session.data,
      errors: errors,
      utype: req.session.utype
    });
  }

  let {
    name,
    father_name,
    dob,
    email,
    father_no,
    phone,
    qual,
    currentCollege,
    gender,
    address,
    courseId,
    fromWhere
  } = req.body;
  edit(course, { _id: courseId }, { $inc: { count: 1 } }, data => {
    console.log(data);
  });
  let obj = enquired(email);
  mail = require("../services/mail")();
  mail(obj);
  var date = new Date();
  eid = "E" + d();
  isRegistered = false;
  DoE = s();
  save(
    entry,
    {
      name,
      father_name,
      dob,
      email,
      father_no,
      phone,
      qual,
      currentCollege,
      gender,
      address,
      course: courseId,
      fromWhere,
      eid,
      isRegistered,
      DoE
    },
    err => {
      res.redirect("/user/addEnquiry");
    }
  );
};

exports.renderViewEnquiry = (req, res) => {
  res.render("staff_view_enquiry", {
    data: req.session.data,
    utype: req.session.utype
  });
};

exports.viewReg = (req, res) => {
  res.render("staff_viewReg", {
    data: req.session.data,
    utype: req.session.utype
  });
};
