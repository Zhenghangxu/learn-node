// returned columns
const course = require("../models/course");
const returnRange = [
  "name",
  "capacity",
  "code",
  "currentEnrollment",
  "shortDesc",
  "longDesc",
];

const getCourses = (req, res, next) => {
  const searchString = req.query.q;
  // /explore/get-courses?q=math
  if (searchString) {
    console.log("searching courses with query");
    course
      .findAll({
        where: {
          name: {
            [sequelize.Op.like]: "%" + searchString + "%",
          },
        },
        attributes: returnRange,
      })
      .then((courses) => {
        res.json(courses);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("get-all-courses");
    course
      .findAll({
        attributes: returnRange,
      })
      .then((courses) => {
        res.json(courses);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const fetchCourse = (req, res, next) => {
  if (!req.query) {
    return;
  }
  const { id, code, n } = req.query;

  // List of columns we can retrive
  const query = {};
  if (id) query.id = id;
  if (code) query.code = code;
  if (n) query.name = n;

  course
    .findAll({ where: query, attributes: returnRange })
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      console.error(err);
    });
};


module.exports = getCourses;
module.exports = fetchCourse;