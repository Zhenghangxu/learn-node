// get the course roster of a student
const getRoster = (req, res, next) => {
  req.currentUser
    .getRoster()
    .then((roster) => {
      res.json(roster.getCourse());
    })
    .catch((err) => console.log(err));
};

module.exports = getRoster;
