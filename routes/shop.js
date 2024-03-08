const express = require("express");
const router = express.Router();

router.use("/gas-plans",(req,res,next)=>{
    console.log("middle-ware-01");
    res.send("<h1>Here are the plans<h1/>");
})

router.use("/electricity-plans",(req,res,next)=>{
    console.log("middle-ware-02");
    res.send("<h1>Here are the house plans<h1/>");
})

module.exports = router;
