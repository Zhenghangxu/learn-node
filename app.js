const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const signUpRoute = require("./routes/signUp");
const shopRoute = require("./routes/shop");

// this will intelligently parse the body for every request
app.use(bodyParser.urlencoded({extended:false}));

app.use(signUpRoute);
app.use("/plans",shopRoute);


// event driven artictecture
const server = http.createServer(app);

// this will allow node to listen for ongoing request


// 404 at the bottom
app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>");
});


server.listen(3000,()=>{
    console.log("server start listening");
});
