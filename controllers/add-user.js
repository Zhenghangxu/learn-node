const user = require("../models/user");

const addUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  user
    .create({
    //   userName: "jason1",
    //   email: "testEmail@gmail.com",
      userName: username,
      email: email,
    })
    .then((user) => res.json(user))
    .catch(err => console.log(err));
};

module.exports = addUser;