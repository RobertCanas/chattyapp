// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
}

function getColor() {
  const color = Math.floor(Math.random() * 16777216).toString(16);
  return '#000000'.slice(0, -color.length) + color;
}

wss.on('connection', (ws) => {
  wss.broadcast(`{"type": "clientCount", "clients": "${wss.clients.size}"}`);

  ws.send(JSON.stringify({type: 'setColor', color: getColor()}));
  console.log('Client connected');
  ws.on('message', (message) => {
    const newMessage = JSON.parse(message);
    newMessage.uuid = uuid.v4();
      if (newMessage.type === 'postMessage') {
        newMessage.type = 'incomingMessage';
      }
      if (newMessage.type === 'postNotification') {
        newMessage.type = 'incomingNotification';
      }
      wss.broadcast(JSON.stringify(newMessage));
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
  wss.broadcast(`{"type": "clientCount", "clients": "${wss.clients.size}"}`);
  });

});