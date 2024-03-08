const express = require("express");
const router = express.Router();


router.use("/create-user",(req,res,next)=>{
    console.log("middle-ware-01");
    res.send("<form action='/new-user' method='POST'><input type='text' name='userName'></input><button type='submit'>test</button><form/>")
})
// use get/post to filter out different request
router.post("/new-user",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;

