const Usuario = require('../models/usuarioModel');

function login(req, res) {
  res.render('login');
}
async function autenticar(req, res) {
  const resp= await Usuario.autenticar(req.body.email, req.body.senha);
  if (resp && resp.length > 0) {
req.session.user = resp[0];
return res.redirect('/tarefas');
  } else {
return res.redirect('/login');
  }

}

module.exports = {login, autenticar};