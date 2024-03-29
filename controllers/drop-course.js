const User = require("../models/user");
const Roster = require("../models/roaster");
const Course = require("../models/course");
const dropCourse = (req, res, next) => {
  const courseId = req.body.courseId;
  const userId = req.body.userId;
  let updatedCourseList;
  //   const userId = req.session.currentUser.id;
  User.findByPk(userId)
    .then((user) => {
      return user.getRoster();
    })
    .then((roster) => {
        
      // check if course is already enrolled
      return roster.getCourses({ where: { id: courseId } });
    })
    .then((courses) => {
        if (courses.length === 0) {
            res.json({ message: "Course not enrolled!" });
            return;
        }
        const course = courses[0];
        course.rosterItem.destroy();
        course.currentEnrollment -= 1;
    })
    .then((result) => {
        res.json({ message: "Course Dropped!",  });
    })
    .catch((err) => console.log(err));
};

module.exports = dropCourse;
