const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 8123;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server running on port', PORT);
  });