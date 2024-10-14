const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;

// Serve the index.html file
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

// Listen for requests on all network interfaces
server.on('request', app);

// Start the server on the specified port
server.listen(PORT, '0.0.0.0', function () {
  console.log('Listening on ' + PORT);
});

/** Websocket **/
const WebSocketServer = require('ws').Server;

// Create a WebSocket server, using the same server instance
const wss = new WebSocketServer({ server: server });

wss.on('connection', function connection(ws) {
  const numClients = wss.clients.size;

  console.log('clients connected: ', numClients);

  // Broadcast the current number of clients connected
  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('welcome!');
  }

  ws.on('close', function close() {
    wss.broadcast(`Current visitors: ${wss.clients.size}`);
    console.log('A client has disconnected');
  });

  ws.on('error', function error() {
    //
  });
});

/**
 * Broadcast data to all connected clients
 * @param  {Object} data
 * @void
 */
wss.broadcast = function broadcast(data) {
  console.log('Broadcasting: ', data);
  wss.clients.forEach(function each(client) {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};
/** End Websocket **/