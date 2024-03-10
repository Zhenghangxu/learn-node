const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../utils/path");

router.use("/gas-plans",(req,res,next)=>{
    console.log("middle-ware-01");
    res.sendFile(path.join(rootDir,"views","pages","gas-plan.html"));
})

router.use("/electricity-plans",(req,res,next)=>{
    console.log("middle-ware-02");
    res.send("<h1>Here are the house plans<h1/>");
})

module.exports = router;
