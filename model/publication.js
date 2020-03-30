const connection = require('./connection');
const moment = require('moment');

class Publier{
    constructor(row){
        this.row = row
    }

    get contenu(){
        return this.row.contenu
    }

    get datecreation(){
        return moment(this.row.datecreation).locale('fr')
    }

    get id_todo(){
        return this.row.id_todo
    }

    static create(content,cb){
        connection.query('INSERT INTO todolist SET contenu=?, datecreation=?',[content,new Date()],(err,result)=>{
            if(err) throw err
            cb(result);
        })
    }

    static update(content,id,cb){
        connection.query('UPDATE todolist SET contenu=?,datecreation=? WHERE id_todo=?',[content,new Date(),id],(err,result)=>{
            if(err) throw err
            cb(result);
        })
    }

    static delete(id,cb){
        connection.query('DELETE FROM todolist WHERE id_todo=?',[id],(err,result)=>{
            if(err) throw err
            cb(result);
        })
    }

    static all(cb){
        connection.query('SELECT * FROM todolist',(err,result)=>{
            if(err) throw err
            cb(result.map((row)=> new Publier(row)));
        })
    }
    
}

module.exports = Publier;