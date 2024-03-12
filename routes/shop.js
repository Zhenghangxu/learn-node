const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../utils/path");

router.get("/get-courses", (req, res, next) => {
  console.log("get-all-courses");
  res.sendFile(path.join(rootDir, "views", "pages", "gas-plan.html"));
});

router.post("/get-courses", (req, res, next) => {
  console.log("searching courses");
  res.send("<h1>Search Courses<h1/>");
});

module.exports = router;
