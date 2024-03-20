const user = require("../models/user");

const getUser = (req, res, next) => {
  const id = req.body.id;
  user
    .findByPk(id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
};
module.exports = getUser;
