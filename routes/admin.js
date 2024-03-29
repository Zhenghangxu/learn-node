// this is the admin route
const express = require("express");
const router = express.Router();
const addCourse = require("../controllers/add-course");
const editCourse = require("../controllers/edit-course");
const deleteCourse = require("../controllers/delete-course");
const addUser = require("../controllers/add-user");
const getUser = require("../controllers/get-user");

// add course
router.post("/add-course", addCourse);

// update existing course
// TODO: add authentication
router.post("/edit-course", editCourse);

// delete course
router.post("/delete-course", deleteCourse);

// add user
// router.post("/add-user", addUser);

// get user
router.post("/get-user",getUser);

module.exports = router;
