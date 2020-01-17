const express = require('express');
const http = require('http');
const webSocketServer = require('websocket').server;
const messagesHandler = require('./routes/api/messages');
const index = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 8123;

const server = http.createServer(app);

// =====WebSocket=====
// create the server
wss = new webSocketServer({
    httpServer: server
});
module.exports.wsServer = wss; // export websocket server, agar dapat digunakan oleh module lain

require('./routes/websocket/websocket').wsConnect(wss); // run websocket server

app.use('/',index);
app.use('/messages', messagesHandler);

// run server
server.listen(PORT, () => {
    console.log('server running on port', PORT);
});