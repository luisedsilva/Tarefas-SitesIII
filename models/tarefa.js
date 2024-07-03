class Tarefa { 
    constructor(id, title, description) { 
    this.id = id; 
    this.title = title; 
    this.description = description; 
    } 
    async salvar(){
      const db = require('./database');
      let sql=null;
      console.log(this.id);
      if(this.id == undefined)
   
            sql=`INSERT INTO tarefa (title, description,usuario_id_usuario) VALUES ("${this.title}", "${this.description}", 1)`;
       else
            sql=``;
   
      return await db.query(sql);
   }
   
   static async listarTarefas(){
      const db = require('./database'); 
      const tarefas= await db.query(`SELECT * FROM tarefa`);
      return tarefas;
   }
   static async deleteTarefa(idTarefa) {
      const db = require('./database');
      if(await db.query(`DELETE FROM tarefa WHERE id_tarefa=${idTarefa}`))
        return true;
      else
        return false;
    }
  
    }
     module.exports = Tarefa;