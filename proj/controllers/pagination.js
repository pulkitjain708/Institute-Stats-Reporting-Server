let { course, entry, staff, register } = require("../models/index");
let { findDocs } = require("../services/crud");
var rp = require('request-promise')
const { parse, stringify } = require('flatted/cjs');

exports.courseData = (req, res) => {
  limit = req.body.limit;
  search = req.body.text;
  page = req.body.page;

  if (search) {
    var regexp = new RegExp(search, "i");
    searching = { $or: [{ cname: regexp }, { cid: regexp }, { fees: regexp }] };
  } else {
    searching = {};
  }

  options = {
    page,
    limit
  };

  course.paginate(searching, options, (err, result) => {
    res.send(result.docs);
  });
};

exports.enquiryData = (req, res) => {
  page = req.body.page;
  limit = req.body.limit;
  text = req.body.text;
  courseId = req.body.courseId;

  if (text) {
    var regexp = new RegExp(text, "i");
    searching = { $or: [{ name: regexp }, { email: regexp }] };
  } else {
    searching = {};
  }

  if (courseId) {
    searching.course = courseId;
  }
  options = {
    page,
    limit,
    select: "name email phone qual gender isRegistered DoE eid"
  };

  entry.paginate(searching, options, (err, result) => {
    res.send(result);
  });
};

exports.staffData = (req, res) => {
  limit = req.body.limit;
  search = req.body.text;
  page = req.body.page;

  if (search) {
    var regexp = new RegExp(search, "i");
    searching = {
      $or: [
        { name: regexp },
        { title: regexp },
        { address: regexp },
        { email: regexp }
      ]
    };
  } else {
    searching = {};
  }

  options = {
    page,
    limit,
    select: "_id name title doj phone email gender address dob"
  };

  staff.paginate(searching, options, (err, result) => {
    res.send(result);
  });
};

exports.courseName = (req, res) => {
  course.find({}, "cname status", (err, result) => {
    res.send(result)
  })
};

exports.registrations = (req, res) => {
  limit = req.body.limit;
  search = req.body.text;
  page = req.body.page;
  courseId = req.body.courseId;

  if (search) {
    var regexp = new RegExp(search, "i");
    searching = { $or: [{ name: regexp }, { rid: regexp }, { phone: regexp }] };
  } else {
    searching = {};
  }
  if (courseId) {
    searching.course = courseId;
  }

  options = {
    page,
    limit,
    select: "rid name email phone gender DoE"
  };

  register.paginate(searching, options, (err, result) => {
    res.send(result.docs);
  });
};

// REPORT GENERATION CODE
exports.enquiryCount = (req, res) => {
  course
    .find({}, "cname _id")
    .then(data => {
      return data;
    })
    .then(data => {
      arr = [];
      for (i of data) {
        arr.push({
          id: i._id,
          name: i.cname
        });
      }
      return arr;
    })
    .then(arr => {
      d = [];
      async function s() {
        for (i of arr) {
          count = await entry.count({ course: i.id });
          d.push({
            name: i.name,
            count: count
          });
        }
        return d;
      }
      return s();
    })
    .then(data => {
      res.send(data);
    });
};

exports.regCount = (req, res) => {
  course
    .find({}, "cname _id")
    .then(data => {
      return data;
    })
    .then(data => {
      arr = [];
      for (i of data) {
        arr.push({
          id: i._id,
          name: i.cname
        });
      }
      return arr;
    })
    .then(arr => {
      d = [];
      async function s() {
        for (i of arr) {
          count = await register.count({ course: i.id });
          d.push({
            name: i.name,
            count: count
          });
        }
        return d;
      }
      return s();
    })
    .then(data => {
      res.send(data);
    });
};

exports.studentsList = (req, res) => {
  course
    .find({}, "_id cname")
    .then(data => {
      async function d() {
        cours = [];
        for (i of data) {
          edata = await entry.find(
            { course: i._id, isRegistered: false },
            "eid name email phone DoE"
          );
          rdata = await register.find(
            { course: i._id },
            "rid name email phone DoE"
          );
          cours.push({
            n: i.cname,
            r: rdata,
            e: edata
          });
        }
        return cours;
      }
      return d();
    })
    .then(data => {
      res.send(data);
    });
};

exports.filter = (req, res) => {

  collection = req.body.collection;
  courseId = req.body.course
  var nnn = collection == 1 ? "Registrations" : "Enquiries";
  from = new Date(req.body.from);
  to = new Date(req.body.to);
  let model = collection == 1 ? register : entry;
  let q = { course: courseId };
  if (collection == 2) {
    q = { isRegistered: false, course: courseId };
  }
  let id = collection == 1 ? "rid" : "eid";
  async function dddd() {
    data = await model.find(
      {
        $and: [
          { DoE: { $gte: from, $lte: to } },
          q
        ]
      },
      `${id} name phone email DoE`,
    );
    return data
  }
  dddd().then(result => {
    a = {
      result: result,
      type: nnn,
      from,
      to,
      cs: req.body.cs
    }
    res.send(a)
  })
};
