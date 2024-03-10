const express = require("express");
const router = express.Router();
const path = require("path");


router.use("/create-user",(req,res,next)=>{
    console.log("middle-ware-01");
    res.sendFile(path.join(__dirname,"..","views","pages","create-user.html"));
})
// use get/post to filter out different request
router.post("/new-user",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;

