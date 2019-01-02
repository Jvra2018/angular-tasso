import { Request, Response } from 'express';
import { User, users } from './users';

import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config';

export const handleAuthentication = (req: Request, resp: Response)=>{
  const user: User = req.body 
  if(isValid(user)){
    const dbUser: User = users[user.email]
    //gerar o token
    //iss é o issue, que quer dizer quem esta emitindo o token
    const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, 
    apiConfig.secret)
    resp.json({name: dbUser.name, email: dbUser.email,accessToken: token}) /* Ao enviar seus 
    dados (email e senha), será retornado o nome e o email e o accessToken será o 
    token gerado */
  }
  else{
      resp.status(403).json({message: 'Dados inválidos.'})
  }
}

function isValid(user): boolean{
    if(!user){
    return false
}
    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}