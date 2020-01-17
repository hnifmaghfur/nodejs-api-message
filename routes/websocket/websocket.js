const wss = require('../../server').wsServer;

clients = [];
function wsConnect(wss) {
  wss.on('request', (req) => {
    var connection = req.accept(null, req.origin);
    clients.push(connection);
    console.log('[wss] jumlah yg terhubung :',clients.length)
    wss.on('close', () => {
      clients.splice(clients.indexOf(req), 1);
      console.log('[wss] ',req.origin,' keluar');
      console.log('[wss] sisa yg terhubung :',clients.length)
      
    })
  });
}

/**
 * fungsi broadcast yang bertugas membagi pesan yang di dapat ke semua client yang terkonek ke websocket
 * @param {Object} msg pesan yang akan di broadcast ke semua client
 */
function broadcast(msg) {
  console.log(msg);
  for(let i=0; i< clients.length; i++){
    clients[i].sendUTF(JSON.stringify(msg));
  }
};

module.exports = {
  wsConnect,
  broadcast
}