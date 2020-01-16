const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// storage penyimpanan untuk menampung message yang masuk
let obj = {
  history: []
}

// body parser jika yang dikirimkan data json
router.use(bodyParser.json());

// get all data di storage
router.get('/', (req, res) => {
  res.status(200).json(obj);
});

// api untuk client mengirimkan pesan ke server dan akan di broadcast ke semua client yang terkoneksi ke websocket server
router.post('/', (req, res) => {
  // untuk keterangan waktu
  let waktu = new Date();
  let timeDisplay = `${(waktu.getHours())}:${(waktu.getMinutes())}:${(waktu.getSeconds())} ${waktu.getDate()}/${waktu.getMonth() + 1}/${waktu.getFullYear()}`;

  // chunk jika client menggunakan req type text/plain
  let chunk = '';

  // penampung sementara yang akan di dump ke storage obj history
  let dataDump = {};
  // handle req type 
  switch (req.headers['content-type']) {
    // jika yang dikirimkan data string
    case 'text/plain':
      req.on('data', function (data) {
        chunk += data; // menampung sring message
      })
      req.on('end', function () {
        dataDump = {
          "message": chunk,
          "recieved_time": timeDisplay
        }
        wssBroadcast(dataDump); // broadcast ke semua client yang terhubung ke websocket server
        obj.history.push(dataDump); // store ke storage
      })
      break;

    // jika yang dikitimkan data json
    case 'application/json':
      dataDump = {
        "message": req.body.message,
        "recieved_time": timeDisplay
      }
      wssBroadcast(dataDump);
      obj.history.push(dataDump);
      break;
    default:
      break;
  }
  res.status(200).send('pesan diterima'); // respon status 200 berarti sukses
});

module.exports = router;