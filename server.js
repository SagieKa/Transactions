var express = require('express');
var app = express();
var http = require('http').Server(app);
const fs = require('fs');
const download = require('download');
const path = require('path');
const axios = require('axios');
var multer = require('multer');
var cors = require('cors');
const connectDB = require('./DB/Connnection');
router = express.Router();
const mongoose = require('mongoose');
const transSchema = require('./DB/TransactionSchema');
const db_json = require('./src/Components/DB');

var cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// mongoose.connect('mongodb://localhost:27017/myDb', { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });

connectDB();

app.use(cors());
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pdf');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log('this is the req file');
    console.log(req.file.filename);
    console.log('this is the req file');
    return res.status(200).send(req.file);
  });
});
app.post('/saveData', async function (req, res, next) {
  console.log('hi');
  console.log(req.body);
  // console.log(req.body);
  console.log(typeof req.body);
  let trans = new transSchema(req.body);

  await trans.save();
  console.log('this is schema:');
  // let rek = await transSchema.find({});
  console.log(rek);
  console.log('this is schema:');
  console.log(trans);

  db_json.data.push(req.body);
  console.log(db.data);
});
app.get('/getData', async function (req, res, next) {
  let trans = await transSchema.find({});
  res.send({ result: trans });
});
app.post('/updateData', async function (req, res, next) {
  await transSchema.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    {},
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.delete('/deleteData/:id', async function (req, res, next) {
  console.log(req.params.id);
  await transSchema.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
  });
});
app.get('/downloadFile/:file', function (req, res, next) {
  console.log(req.params.file);
  console.log('you are in download file');
  console.log(__dirname + '/logo192.png');
  res.download(__dirname + '/public/pdf/' + req.params.file, req.params.file);
  console.log('you end the download file ');
});

app.listen(8000, function (req, res, next) {
  console.log('App running on port 8000');
});

module.exports = router;
