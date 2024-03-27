const User = require("../models/user");
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
//   const password = req.body.password;
  User.findAll({ where: { email: email } })
    .then((user) => {
      if (!user[0]) {
        return res.json({ message: "User not found!" });
      }
      return user[0];
    })
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.currentUser = user;
      return res.json({ message: "Logged in!", user: user });
    })
    .catch((err) => console.log(err));
  // todo: add the validation
  //   res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=3600; httpOnly");

  //   req.session.isLoggedIn = true;
  // todo: in the future, redirect will happen in react router

  // res.json({message: "Logged in!"});
  //   res.send("<h1>Logged in!</h1>");
};
