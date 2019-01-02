"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        //gerar o token
        //iss é o issue, que quer dizer quem esta emitindo o token
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, 'meat-api-password');
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token }); /* Ao enviar seus
        dados (email e senha), será retornado o nome e o email e o accessToken será o
        token gerado */
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
