var app = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = app.Router();
router.use(cors());
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
  console.log(userResponse)
  userRef.child(userResponse.matricula).set(userResponse);

});
//Rota para Deletar usuarios
//Deletar usuario a partir da matricula
router.post('/users/remove', (req, res) => {
  var userResponse = req.body;
  console.log('Removendo: ' + userResponse.nome);
  userRef.child(userResponse.matricula).remove();

});

//Rota para dar update nos usuarios
//Atualizar informações do usuario
router.post('/users/update', (req, res) => {
  var userResponse = req.body;
  console.log(userResponse)
  userRef.child(userResponse.matricula).update(userResponse);

});


module.exports = router;