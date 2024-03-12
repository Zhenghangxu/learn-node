const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./utils/database");
const course = require("./models/course");



const app = express();

const signUpRoute = require("./routes/signUp");
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const path = require("path");

// this will intelligently parse the body for every request
app.use(bodyParser.urlencoded({ extended: false }));


app.use(signUpRoute);
app.use("/admin", adminRoute);
app.use("/plans", shopRoute);



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
  .then((result) => {
    server.listen(3000, () => {
      console.log(result);
      console.log("server start listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// module.exports = path.dirname(require.main.filename);
