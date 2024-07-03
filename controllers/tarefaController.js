const Tarefa = require('../models/tarefa'); 
const tarefas = [];

async function getTarefas(req, res) { 
	const tarefas= await Tarefa.listarTarefas(); 
	res.render('tarefas', { tarefas }); 
} 

async function addTarefa(req, res) { 
	const { id, title } = req.body; 
	const tarefa = new Tarefa(id, title, false); 
	await tarefa.salvar();
	  
	res.redirect('/tarefas'); 
}

async function deleteTarefa(req, res){
 
	let idTarefa=req.params.id;
	let msg='';
	if(await Tarefa.deleteTarefa(idTarefa)){
		msg = 'Sucesso!';
	}else{
	  msg = 'Falha!';
	}
	res.redirect('/tarefas');
  
  }
  
module.exports = { getTarefas, addTarefa, deleteTarefa };