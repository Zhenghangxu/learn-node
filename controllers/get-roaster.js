// get the course roster of a student
const getRoster = (req, res, next) => {
  if (!req.session.currentUser) {
    res.statusCode(401).json({ message: "Unauthorized" });
    return;
  }
  req.session.currentUser
    .getRoster()
    .then((roster) => {
      res.json(roster.getCourse());
    })
    .catch((err) => console.log(err));
};

module.exports = getRoster;
