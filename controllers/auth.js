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
exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.json({ message: "session expired!" });
  });
};

exports.postSignUp = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const userName = req.body.userName;

  // check if user already exist
  User.findAll({ where: { email: email } })
    .then((user) => {
      if (user.length > 0) {
        return res.json({ message: "User already exist!" });
      }
      return User.create({
        email: email,
        password: password,
        userName: userName,
      });
    })
    .then((user) => {
      //create a session
      req.session.isLoggedIn = true;
      req.session.currentUser = user;
      //create a roster
      user.createRoster();
      res.json({ message: "User created!", user: user });
    })
    .catch((err) => console.log(err));
};
