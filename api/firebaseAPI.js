var app = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = app.Router();


var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,OPTION,POST,DELETE",
  "allowedHeaders": ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
router.options('*', cors());

router.use(cors(corsOptions));
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
//Firebase
var fb = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  databaseURL: "https://stonedesafio.firebaseio.com"
});

//Firebase aplicacoes Variaveis
var db = fb.database();
//Referencias
var userRef = db.ref("/users");

//Recuperar todos os usuariosng
router.get('/users', (req, res) => {

  userRef.once("value", (snapshot) => {
    let list = [];
    snapshot.forEach(function (elem) {
      list.push(elem.val());
    });

    list = JSON.stringify(list);
    list = JSON.parse(list);

    res.json(list);
  });

});

// Rota para adicionar Usuarios
//Verificar se ja existe o usuario (pela matricula)
router.post('/users/add', (req, res) => {
  var userResponse = req.body;

  userRef.child(userResponse.matricula).on("value", function (snapshot) {
    if (snapshot.exists) {
      status = {
        status: "exist"
      };
      res.json(status);
    }else{
      userRef.child(userResponse.matricula).set(userResponse, (error) => {
        if (error) {
          status = {
            status: "error"
          };
          res.json(status);
        } else {
          status = {
            status: "sent"
          };
          res.json(status);
        }
      });
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });



});
//Rota para Deletar usuarios
//Deletar usuario a partir da matricula
router.post('/users/remove', (req, res) => {
  var userResponse = req.body;
  console.log('Removendo: ' + userResponse.nome);
  userRef.child(userResponse.matricula).remove();
  res.json(userResponse);

});

//Rota para dar update nos usuarios
//Atualizar informações do usuario
//router.options('/users/update', cors());
router.post('/users/update', (req, res) => {
  var userResponse = req.body;
  console.log(userResponse)
  userRef.child(userResponse.matricula).update(userResponse, (error) => {
    if (error) {
      status = {
        status: "error"
      };
      res.json(status);
      console.log('{"status":"error"}');
    } else {
      status = {
        status: "sent"
      };
      res.json(status);
    }
  });


});


module.exports = router;