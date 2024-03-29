// Handle user login
const {postLogin} = require("../controllers/auth");
const {postLogOut} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/log-in", postLogin);
router.post("/log-out", postLogOut);

module.exports = router;

// Next Sesssion - implement session in mySQL