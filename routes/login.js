// Handle user login
const {postLogin} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.get("/log-in", postLogin);

module.exports = router;

// Next Sesssion - implement session in mySQL