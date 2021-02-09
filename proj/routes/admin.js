const post = require("../controllers/admin_post_data");
const get = require("../controllers/admin");
const express = require("express");
const router = express.Router();
const auth = require("../helpers/auth");
const { check } = require("express-validator");

//Get Routes
router.get("/", auth, get.renderNavbar);
router.get("/addCourse", auth, get.renderAddCourse);
router.get("/viewCourse", auth, get.renderViewCourse);
router.get("/addEnquiry", auth, get.renderAddEnquiry);
router.get("/viewEnquiry", auth, get.renderViewEnquiry);
router.get("/addStaff", auth, get.renderAddStaff);
router.get("/staffTable", auth, get.renderViewStaff);
router.get("/reports", auth, get.renderReports);
router.get("/viewReg", auth, get.viewReg);

//Post Routes
router.post("/postUser", post.verifyUser);
router.post(
  "/addCourse",
  [
    check("cname", "Course Name must be there").isLength({ min: 1 }),
    check("fees", "Fees must be in Numbers").isInt(),
    check("duration", "Choose a duration").isInt()
  ],
  post.addCourse
);
router.post(
  "/addEnquiry",
  [
    check("name", "Enter Name").isLength({ min: 3 }),
    check("email", "Enter a Valid Email").isEmail(),
    check("phone", "Enter a valid phone number")
      .isLength({ min: 10, max: 10 })
      .isInt()
  ],
  post.addEnquiry
);
router.post(
  "/addStaff",
  [
    check("name", "Enter Name").isLength({ min: 3 }),
    check("email", "Enter a Valid Email").isEmail(),
    check("phone", "Enter a valid phone number")
      .isLength({ min: 10, max: 10 })
      .isInt(),
    check("title", "Enter Title").notEmpty()
  ],
  post.addStaff
);
router.post("/updateCourse", post.updateCourse);
router.post("/deleteCourse", post.deleteCourse);
router.post("/updateStaff", post.updateStaff);
router.post("/deleteStaff", post.deleteStaff);
router.post("/updateEnquiry", post.updateEnquiry);

module.exports = router;
