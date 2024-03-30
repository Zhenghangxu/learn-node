const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const passcode = req.body.password;
  const currentLoginedUser = req.session.currentUser;
  //   const password = req.body.password;
  if (!passcode) {
    res.status(400).json({ message: "password is required" });
    // throw new Error("password is required");
  }
  if (currentLoginedUser) {
    res.status(403).json({ message: "A user already logged in!" });
    // throw new Error("A user already logged in!");
  }
  User.findAll({ where: { email: email } })
    .then((user) => {
      if (!user[0]) {
        res.status(404).json({ message: "User not found!" });
        throw new Error("User not found!");
      }
      return user[0];
    })
    .then((selectedUser) => {
      bcrypt
        .compare(passcode, selectedUser.password)
        .then((result) => {
          if (!result) {
            return res.json({ message: "Invalid Credentials!" });
          }
          req.session.isLoggedIn = true;
          req.session.currentUser = selectedUser;
          return res.json({
            message: "Logged in!",
            user: {
              userName: selectedUser.userName,
              email: selectedUser.email,
            },
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.json({ message: "session destory!" });
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
        res.json({ message: "User already exist!" }).status(401);
        throw new Error("User already exist!");
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      return User.create({
        email: email,
        password: hashedPassword,
        userName: userName,
      });
    })
    .then((user) => {
      //create a session
      req.session.isLoggedIn = true;
      req.session.currentUser = user;
      //create a roster
      user.createRoster();
      res.json({
        message: "User created!",
        user: { email: user.email, userName: user.userName },
      });
    })
    .catch((err) => console.log(err));
};
