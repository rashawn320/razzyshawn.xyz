const http = require('http');


http.createServer(function (req,res){
res.write("Hello World");
res.end();


}).listen(3000);

console.log("Server Started on port 3000");
