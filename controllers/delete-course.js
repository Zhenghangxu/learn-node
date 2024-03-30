const course = require("../models/course");

const deleteCourse = (req, res, next) => {
  const id = req.body.id;
  course
    .findByPk(id)
    .then((course) => {
      // TODO: future enhancement: create a cache (trash can) for all the deleted instance
      return course.destroy();
    })
    .then((result) => {
      console.log("deletion complete! ", result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = deleteCourse;
