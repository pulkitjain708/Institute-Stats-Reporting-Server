const uc = require("../controllers/user_cont");
const express = require("express");
const router = express.Router();
const auth = require("../helpers/userAuth");
const { check } = require("express-validator");

//Get Routes
router.get("/", auth, uc.renderNavbar);

router.get("/addEnquiry", auth, uc.renderAddEnquiry);

router.get("/viewEnquiry", auth, uc.renderViewEnquiry);

router.get("/viewReg", auth, uc.viewReg);

router.get("/reports", uc.getReports);

router.post(
  "/addEnquiry",
  [
    check("name", "Enter Name").isLength({ min: 3 }),
    check("email", "Enter a Valid Email").isEmail(),
    check("phone", "Enter a valid phone number")
      .isLength({ min: 10, max: 10 })
      .isInt()
  ],
  uc.postAddEnquiry
);

module.exports = router;
