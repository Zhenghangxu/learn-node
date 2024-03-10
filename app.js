const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const signUpRoute = require("./routes/signUp");
const shopRoute = require("./routes/shop");
const path = require("path");

// this will intelligently parse the body for every request
app.use(bodyParser.urlencoded({extended:false}));

// serve css
app.use(express.static(path.join(__dirname,"public")));

app.use(signUpRoute);
app.use("/plans",shopRoute);


// event driven artictecture
const server = http.createServer(app);

// this will allow node to listen for ongoing request


// 404 at the bottom
app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname+"/views/pages/404.html");
});


server.listen(3000,()=>{
    console.log("server start listening");
});


// module.exports = path.dirname(require.main.filename);

