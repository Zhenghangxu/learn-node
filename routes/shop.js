const express = require("express");
const path = require("path");
const router = express.Router();
const course = require("../models/course");
const sequelize = require("sequelize");
const getCourses = require("../controllers/get-courses");
const fetchCourse = require("../controllers/get-courses");

router.get("/get-courses", getCourses);

// Find by parameter: exact match
router.get("/fetch-course", fetchCourse);

module.exports = router;
