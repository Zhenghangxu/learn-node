const fs = require("fs");

const requestHandler = (req,res) => {
    const parseBody = () =>{
        const body = [];
        req.on("data",(chunks)=>{
            console.log(chunks);
            body.push(chunks);
        })
        req.on("end",()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const parsedObject = new URLSearchParams(parsedBody);
            console.log(parsedObject);
            fs.appendFile("userInfo.txt",`UserName: ${parsedObject.get("username")}; Password: ${parsedObject.get("password")}`,()=>{
                res.statusCode = 302;
                res.setHeader("Location","/success");
                return res.end();
            });
        })
    }


    if (req.url=== "/" ) {
        res.write("<html>");
        res.write("<h1> homePage");
        res.write("</h1>");
        res.write("</html>");
        return res.end();
    }
    if (req.url === "/create-user") {
        res.write("<html>");
        res.write("<h1> template Pages");
        res.write("<form action='/submission-result' method='POST'><input type='text' name='username'></input><input type='text' name='password'></input><Button type='submit'>Submit</Button></form>");
        res.write("</h1>");
        res.write("</html>");
        return res.end();
    }
    if (req.url === "/submission-result" && req.method === "POST") {
        parseBody();
    };
    if (req.url === "/success") {
        res.write("<html>");
        res.write("User Created");
        res.write("</h1>");
        res.write("</html>");
        return res.end();
    }

}

module.exports = requestHandler;