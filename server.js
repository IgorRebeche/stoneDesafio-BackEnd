var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var fb = require("firebase-admin");
var app = express();
var api = require('./api/firebaseAPI');

app.use("/api", api);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send("Ola mundo");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
