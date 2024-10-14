const express = require('express');
const { ServerResponse } = require('http');
const server = require('http').createServer();
const app = express();


app.get('/',function(req,res){
    res.sendFile('index.html',{root: __dirname});

});

server.on('request',app)
server.listen(3000,function() { console.log('server started on port 3000'); });

/**begin websocket */

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server: server});
wss.on('connection', function connection(ws){
    const numClients = wss.clients.size;
    console.log('Clients connected',numClients);

    wss.broadcast(`Current visitors: ${numClients}`);
    if(ws.readyState === ws.OPEN){
        ws.send("Welcome to My Server");
    }

    ws.on('close',function close(){
        console.log("A client has disconnected");
    });

});

wss.broadcast = function broadcast(data){
   wss.clients.forEach(function each(client){
        client.send(data);
    });
}