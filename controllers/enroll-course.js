const User = require("../models/user");
const Roster = require("../models/roaster");
const Course = require("../models/course");
const enrollCourse = (req, res, next) => {
  const courseId = req.body.courseId;
  const userId = req.body.userId;
  //   const userId = req.session.currentUser.id;
  let fetchedRoster;
  User.findByPk(userId)
    .then((user) => {
      return user.getRoster();
    })
    .then((roster) => {
      fetchedRoster = roster;
      // check if course is already enrolled
      return roster.getCourses({ where: { id: courseId } });
    })
    .then((course) => {
      if (course.length > 0) {
        res.json({ message: "Course already enrolled!" });
        return;
      }
      Course.findByPk(courseId)
        .then((course) => {
          if (course.capacity - course.currentEnrollment <= 0) {
            res.json({ message: "Course is full!" });
            return;
          }
          course.currentEnrollment += 1;
          return fetchedRoster.addCourse(course);
        })
        .then(() => {
          res.json({ message: "Course Enrolled!" });
        })
        .catch((err) => console.log(err));
    })
    .catch();
};

module.exports = enrollCourse;
