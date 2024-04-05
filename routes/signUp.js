
// for now, assume all user is student
const express = require("express");
const router = express.Router();
const postSignUp = require("../controllers/auth").postSignUp;


// use get/post to filter out different request
router.post("/sign-up", postSignUp)

module.exports = router;

