const course = require("../models/course");
const editCourse = (req, res, next) => {
  const id = req.body.id;
  const new_name = req.body.name;
  const new_code = req.body.code;
  const new_shortDesc = req.body.shortDesc;
  const new_longDesc = req.body.longDesc;
  // TODO: term 2 enhancement, add masking to IDs to avoid exposesure of master id values
  course
    .findByPk(id)
    .then((course) => {
        course.name = new_name;
        new_name && (course.name = new_name);
        new_code && (course.code = new_code);
        new_shortDesc && (course.shortDesc = new_shortDesc);
        new_longDesc && (course.longDesc = new_longDesc);
        return course.save();
    })
    .then((result)=>{
        console.log("product updated");
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = editCourse;