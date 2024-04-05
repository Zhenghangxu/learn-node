// Handle user login
const {postLogin} = require("../controllers/auth");
const {postLogOut} = require("../controllers/auth");
const {getCSRFToken} = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const {check} = require("express-validator");


router.get("/csrf-token", getCSRFToken);
router.post("/log-in", check("email").isEmail(), postLogin);
router.post("/log-out", postLogOut);

module.exports = router;

// Next Sesssion - implement session in mySQL