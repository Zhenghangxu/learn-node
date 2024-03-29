const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

// Sequelize
const database = require("./utils/database");
const course = require("./models/course");
const user = require("./models/user");
const Roster = require("./models/roaster");
const RosterItem = require("./models/roster-item");
const term = require("./models/term");
//configure session store
const sequelizeStore = require("connect-session-sequelize")(session.Store);



const app = express();
// Session
app.use(
  session({
    secret: "secrate ABC123",
    resave: false,
    saveUninitialized: false,
    store: new sequelizeStore({ db: database }),
  })
);


// Routes
const signUpRoute = require("./routes/signUp");
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const path = require("path");
const loginRoute = require("./routes/login");

// Associations
// one admin creates course
// constraint true => you can't create a course without associate it with a user(admin)
course.belongsTo(user, { constraint: true, foreignKey: "createdBy" });

// one user (student) can have multiple courses enrolled
user.hasMany(course, { foreignKey: "createdBy" });

user.hasOne(Roster);
Roster.belongsToMany(course, { through: RosterItem });
course.belongsToMany(Roster, { through: RosterItem });
term.hasMany(course, { foreignKey: "termId" });

// this will intelligently parse the body for every request
app.use(bodyParser.urlencoded({ extended: false }));

// Dummy User for testing
// app.use((req, res, next) => {
//   user
//     .findByPk(1)
//     .then((user) => {
//       req.session.currentUser = user;
//       console.log("Current User!", req.session.currentUser);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use(signUpRoute);
app.use("/admin", adminRoute);
app.use("/explore", shopRoute);
app.use(loginRoute);

// event driven artictecture
const server = http.createServer(app);

// this will allow node to listen for ongoing request

// 404 at the bottom
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/views/pages/404.html");
});

// this sync your model with the database
database
  .sync()
  // TODO: replace this with the cookied user; User 5 is super user for now
  .then((result) => {
    return user.findByPk(1);
  })
  .then((selectedUser) => {
    if (!selectedUser) {
      // TODO: remove this super user later
      return user.create({ userName: "jason", email: "xujason1234@gmail.com", password: "1234"});
    }
    return selectedUser;
  })
  .then(async (selectedUser) => {
    const existingRoster = await selectedUser.getRoster();
    if (!existingRoster) {
      // If the user doesn't have a roster, create one
      const newRoster = await selectedUser.createRoster();
      return newRoster;
    } else {
      return existingRoster;
    }
  })
  .then((roster) => {
    server.listen(3000, () => {
      console.log("server start listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// module.exports = path.dirname(require.main.filename);
