import * as jsonServer from 'json-server'
import {Express} from 'express'

import * as fs from 'fs'
import * as https from 'https'
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults() // obrigatorio fazer em todas as app.

// Set default middlewares (logger, static, cors and no-cache)
// O middlewares representa uma array de callbacks
server.use(middlewares)


// Add custom routes before JSON Server router
//Chamando a URI '/echo', vai ser retornado a callback
/*Se usar o use ao invés do get, vai ser funcionado para todos os outros, generaliza
callbacks*/
/*server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
/*server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  //Não vou dar a resposta agora, passe ao proximo da fila
  next()
})*/

//middleware para login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

//Use default router
server.use(router)

///Criando as middlewares, usando typescript
/* Criando a porta HTTPS */
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})