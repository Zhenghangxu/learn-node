const course = require("../models/course");
const getUser = require("../controllers/get-user");
const User = require("../models/user");

const addCourse = async (req, res, next) => {
  const name = req.body.name;
  const capacity = req.body.capacity;
  const code = req.body.code;
  const shortDesc = req.body?.shortDesc;
  const longDesc = req.body?.longDesc;
  const termId = req.body.termId;

  if (!req.session.currentUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const currentUserId = req.session.currentUser.id;
  User.findByPk(currentUserId).then((user) => {
    user
      .createCourse({
        name: name,
        capacity: capacity,
        code: code,
        shortDesc: shortDesc ? shortDesc : null,
        longDesc: longDesc ? longDesc : null,
        termId: termId,
      })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = addCourse;
