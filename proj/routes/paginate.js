const express = require("express");
const router = express.Router();
const paginate = require("../controllers/pagination");

router.post("/courseData", paginate.courseData);
router.post("/enquiryData", paginate.enquiryData);
router.post("/staffData", paginate.staffData);
router.post("/courseName", paginate.courseName);
router.get("/graph_enq", paginate.enquiryCount);
router.get("/graph_reg", paginate.regCount);
router.get("/students", paginate.studentsList);
router.post("/registrations", paginate.registrations);
router.post("/filter", paginate.filter);

module.exports = router;
