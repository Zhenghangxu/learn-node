const course = require("../models/course");
const addCourse = (req, res, next) => {
    const name = req.body.name;
    const capacity = req.body.capacity;
    const code = req.body.code;
    const shortDesc = req.body?.shortDesc;
    const longDesc = req.body?.longDesc;
  // const name = "Test";
  // const capacity = 60;
  // const code = "ECE 501";
  // const shortDesc = "This is a course";
  // const longDesc =
  //   "LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM.";
  req.currentUser
    .createCourse({
      name: name,
      capacity: capacity,
      code: code,
      shortDesc: shortDesc ? shortDesc : null,
      longDesc: longDesc ? longDesc : null,
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = addCourse;