const User = require("../models/user");
exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    // User.findByE
    // todo: add the validation
    res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=3600; httpOnly");
    req.session.isLoggedIn = true;
    // todo: in the future, redirect will happen in react router
    // res.json({message: "Logged in!"});
    res.send("<h1>Logged in!</h1>"); 
}