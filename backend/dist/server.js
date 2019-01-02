"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults(); // obrigatorio fazer em todas as app.
// Set default middlewares (logger, static, cors and no-cache)
// O middlewares representa uma array de callbacks
server.use(middlewares);
// Add custom routes before JSON Server router
//Chamando a URI '/echo', vai ser retornado a callback
/*Se usar o use ao invés do get, vai ser funcionado para todos os outros, generaliza
callbacks*/
/*server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})*/
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
/*server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  //Não vou dar a resposta agora, passe ao proximo da fila
  next()
})*/
//middleware para login
server.post('/login', auth_1.handleAuthentication);
//Use default router
server.use(router);
///Criando as middlewares, usando typescript
/* Criando a porta HTTPS */
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
