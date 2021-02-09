let { findDoc, save, edit, remove } = require("../services/crud");
var randomstring = require("randomstring");
let d = require("../helpers/date")();
let s = require("../helpers/s")();
let { registered, enquired } = require("../services/templates");
const { admin, course, entry, staff } = require("../models/index");
const { validationResult } = require("express-validator");

exports.verifyUser = (req, res) => {
  let { email, password, action, utype } = req.body;

  if (req.body.utype == "on") {
    findDoc(admin, { email, password }, (err, data) => {
      if (data) {
        req.session.utype = 1;
        req.session.data = data;
        console.log("Admin Logged In");
        return res.redirect("/admin");
      } else {
        return res.render("index", {
          data: {},
          errors: ["Such Admin does'nt Exist"],
          utype: req.session.utype
        });
      }
    });
  } else {
    console.log("User Logged In");
    findDoc(staff, { email, password }, (err, data) => {
      if (data) {
        if (data.status == false) {
          return res.render("index", {
            data: {},
            errors: ["Your acoount has been disabled by the administrator"],
            utype: req.session.utype
          });
        }
        console.log(data);
        req.session.utype = 0;
        req.session.data = data;
        return res.redirect("/user");
      } else {
        return res.render("index", {
          data: {},
          errors: ["Such User does'nt Exist"],
          utype: req.session.utype
        });
      }
    });
  }
};

exports.addCourse = (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    return res.render("addCourse", {
      data: req.session.data,
      errors: errors,
      utype: req.session.utype
    });
  }
  cid = randomstring.generate({
    charset: "numeric",
    length: 5
  });
  status = false;
  count = 0;
  let { cname, fees, duration } = req.body;
  save(course, { cname, fees, duration, status, cid, count }, err => {
    res.redirect("/admin/addCourse");
  });
};

exports.addEnquiry = (req, res) => {
  errors = validationResult(req);
  console.log(errors)
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
      console.log(err);
      res.redirect("/admin/addEnquiry");
    }
  );
};

exports.addStaff = (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    return res.render("staff", {
      data: req.session.data,
      errors: errors,
      utype: req.session.utype
    });
  }
  let { address, gender, title, phone, email, dob, name, doj } = req.body;
  save(
    staff,
    {
      address,
      gender,
      title,
      phone,
      email,
      dob,
      name,
      status: false,
      doj,
      password: randomstring.generate(8)
    },
    (err, stats) => {
      console.log(err, stats);
      res.redirect("/admin/addStaff");
    }
  );
};

exports.updateCourse = (req, res) => {
  var status;
  if (req.body.status == "on") {
    status = true;
  } else {
    status = false;
  }
  let { cname, fees, id, duration, cid } = req.body;
  edit(course, { _id: id }, { status, cname, fees, duration, cid }, err => {
    res.redirect("/admin/viewCourse");
  });
};

exports.deleteCourse = (req, res) => {
  _id = req.body._id;
  remove(course, { _id: id }, err => {
    res.send("");
  });
};

exports.updateStaff = (req, res) => {
  let { email, phone, title, doj, id } = req.body;
  edit(
    staff,
    { _id: id },
    { email: email, phone: phone, title: title, doj: doj, status: true },
    (err, status) => {
      res.redirect("/admin/staffTable");
    }
  );
};

exports.deleteStaff = (req, res) => {
  _id = req.body._id;
  remove(staff, { _id: _id }, rea => {
    res.redirect("/admin/staffTable");
  });
};

exports.updateEnquiry = (req, res) => {
  id = req.body._id;
  w = req.body.w;
  if (w == 0) {
    // delete
    remove(entry, { _id: id }, err => {
      res.send();
    });
  } else if (w == 1) {
    findDoc(entry, { _id: id }, (err, data) => {
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
        course,
        fromWhere,
        DoE
      } = data;
      let rid = "R" + d();
      let obj = registered(email, rid);
      mail = require("../services/mail")();
      mail(obj);
      save(
        register,
        {
          rid,
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
          course,
          DoE,
          fromWhere
        },
        (data, err) => {
          edit(entry, { _id: id }, { isRegistered: true }, (err, data) => {
            res.send("");
          });
        }
      );
    });
  }
};
