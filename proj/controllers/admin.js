exports.renderNavbar = (req, res) => {
  res.render("navbar", { data: req.session.data, utype: req.session.utype });
};

exports.renderAddCourse = (req, res) => {
  res.render("addCourse", {
    data: req.session.data,
    errors: null,
    utype: req.session.utype
  });
};

exports.renderViewCourse = (req, res) => {
  res.render("courseTable", {
    data: req.session.data,
    utype: req.session.utype
  });
};

exports.renderAddStaff = (req, res) => {
  res.render("staff", {
    data: req.session.data,
    errors: null,
    utype: req.session.utype
  });
};

exports.renderViewStaff = (req, res) => {
  res.render("staffTable", {
    data: req.session.data,
    utype: req.session.utype
  });
};

exports.renderAddEnquiry = (req, res) => {
  res.render("enquiry", {
    data: req.session.data,
    errors: null,
    utype: req.session.utype
  });
};

exports.renderViewEnquiry = (req, res) => {
  res.render("viewEnquiry", {
    data: req.session.data,
    utype: req.session.utype
  });
};

exports.renderReports = (req, res) => {
  res.render("reports", { data: req.session.data, utype: req.session.utype });
};

exports.viewReg = (req, res) => {
  res.render("viewReg", {
    data: req.session.data,
    utype: req.session.utype
  });
};
