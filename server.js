var express = require('express');
var cors = require('cors');
var admin = require("firebase-admin");
var app = express();
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stonedesafio.firebaseio.com"
});


var db = admin.database();
var ref = db.ref("/users");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.get('/', cors(), function (req, res) {
  res.json('{Hello World: "Teste"}');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
