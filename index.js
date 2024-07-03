const express = require('express'); 
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const tarefaController = require('./controllers/tarefaController');
const usuarioController = require('./controllers/usuarioController'); 
const app = express(); 
const port = 3000; 

app.use(session({secret:'i1n2f3o4'}));
app.set('view engine', 'ejs'); 
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views/layouts/img', express.static(path.join(__dirname, 'public/views/layouts/img')));

app.use((req, res, next) => {
    res.locals.layoutVariables = {
        url: process.env.URL,
        img: "/views/layouts/img/",
        style: "/css/",
        title: 'Tarefas'
    };
    next();
});
app.get('/', (req, res)=>{res.send("<h1>API Tarefas</h1>")});
app.use(express.urlencoded({ extended: true })); 
app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefas', tarefaController.addTarefa); 
app.get('/tarefas/delete/:id', tarefaController.deleteTarefa);
app.get('/login', usuarioController.login);
app.post('/Usuario/autenticar', usuarioController.autenticar);
app.get('/tarefas', (req, res)=>{
  if(req.session.user){
    tarefaController.getTarefas(req,res);
  }else{
    return res.redirect('/login');
  }
});
 
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`);
});
