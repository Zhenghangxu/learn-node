
// for now, assume all user is student
const express = require("express");
const router = express.Router();
const path = require("path");


router.use("/create-user",(req,res,next)=>{
    console.log("create a new user");
    res.sendFile(path.join(__dirname,"..","views","pages","create-user.html"));
})
// use get/post to filter out different request
router.post("/new-user",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
    // TODO:
    // @description: create a new user
    // @params: user name, email, password
    // @return: user id
    // 
    // @description: check if the user already exists
    // @params: user name, email
    // @return: user id / boolean

})

module.exports = router;

