const express = require('express');
const http = require('http');
const webSocketServer = require('websocket').server;
const messagesHandler = require('./routes/api/messages');
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

app.use('/messages', messagesHandler);

// Health check endpoint for readiness probe
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Health check endpoint for liveness probe
app.get('/live', (req, res) => {
    res.status(200).json({ status: 'alive', timestamp: new Date() });
});

app.get('/v2', (req, res) => {
    res.status(200).json({ status: 'alhamdulillah', timestamp: new Date() });
});

// run server
server.listen(PORT, () => {
    console.log('server running on port', PORT);
});

module.exports = app;