var express = require('express');
var cors = require('cors');
var app = express();

app.get('/', cors(), function (req, res) {
  res.json('{Hello World: "Teste"}');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
