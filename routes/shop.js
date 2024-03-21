const express = require("express");
const path = require("path");
const router = express.Router();
const course = require("../models/course");
const sequelize = require("sequelize");
const getCourses = require("../controllers/get-courses");
const fetchCourse = require("../controllers/get-courses");
const getRoster = require("../controllers/get-roaster");
const enrollCourse = require("../controllers/enroll-course");
const dropCourse = require("../controllers/drop-course");

router.get("/get-courses", getCourses);

// Find by parameter: exact match
router.get("/fetch-course", fetchCourse);

router.get("/get-roster", getRoster);

router.post("/enroll-course", enrollCourse);
router.post("/drop-course", dropCourse);

module.exports = router;
