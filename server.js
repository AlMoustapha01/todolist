//Module

const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const session = require('express-session');

//views
app.set('view engine' , 'ejs');

// Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(require('./Middleware/flash'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

//Route

app.get('/',(req,res)=>{
  const Publication = require('./model/publication');
  Publication.all(function (todos) {
    res.render('page/index',{mes:todos});
  })
    
});

app.post('/', (req,res)=>{
  if(req.body.todo === undefined || req.body.todo === ''){
    req.flash('error','Pas de tache transmise ');
    res.redirect('/');
  }else{
    if(req.body.id){
      const Publication = require('./model/publication');
      Publication.update(req.body.todo,req.body.id,()=>{
        req.flash('success','Tache mise à jour avec succès');
        res.redirect('/')
      })
    }else{
      const Publication = require('./model/publication');
      Publication.create(req.body.todo,()=>{
        req.flash('success','Tache transmise');
        res.redirect('/');
      })
    }
    
    
  }

})

app.post('/delete',(req,res)=>{
  const Publication = require('./model/publication');
  Publication.delete(req.body.del,()=>{
    req.flash('success','Tache supprimée avec succès');
    res.redirect('/')
  })
})

app.listen(5000,()=>{console.log("App listen at port 5000")});