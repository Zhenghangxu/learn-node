const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// const { doubleCsrf } = require("csrf-csrf");

// const {generateToken} = doubleCsrf();

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const passcode = req.body.password;
  const currentLoginedUser = req.session.currentUser;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 422 is a status code for validation error
    res.status(422).json({ message: errors.array() });
  }
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
  const adminCode = req.body.adminCode;
  const institution_Id = req.body.institutionId;

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
        // TODO: add a check for adminCode
        role: adminCode === "admin" ? "admin" : "user",
        institutionId: institution_Id,
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

// enable this CSRF after project is complete

exports.getCSRFToken = (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
};


exports.postResetPassword = (req,res,next) => {
  const eamil = req.body.email;

}
