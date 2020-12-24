const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./views/database/database");
const Pergunta = require("./views/database/Pergunta")
const Resposta = require("./views/database/Resposta")
connection.authenticate()
.then(() =>{
  console.log('Conexão feita com o banco de dados')
})
.catch((msgErro) =>{
  console.log(msgErro);
})
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
//Body Pareser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//ROtas
app.get("/", (req, res) => {

  Pergunta.findAll({raw: true, order:[
    ['id','DESC']  //ASC = Descresente e DESC = Descresente
  ] }).then(perguntas =>{
    console.log(perguntas);
    res.render("index",{
      perguntas:perguntas,
    });
  });

  //SELECT ALL FROM PERGUNTAS ESQUIVALE  ISSO
});

app.get("/perguntar",(req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
 Pergunta.create({
   titulo: titulo,
   descricao: descricao
 }).then(() =>{
res.redirect("/");
 });
});

app.get("/pergunta/:id",(req, res) =>{
  var id = req.params.id;
  Pergunta.findOne({
    where: {id:id}
  }).then(pergunta =>{
    if(pergunta != undefined){//pergunta encontrada
      Resposta.findAll({
        where:{perguntaId:pergunta.id}
      }).then(respostas =>{
        res.render('pergunta',{
          pergunta: pergunta,
          respostas: respostas
        });
         
      })
    }else{//não encontrada
      res.redirect('/');

    }
  })
});

app.post("/", (req, res) => {
  var corpo =req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId

  }).then(() => {
    res.redirect("/pergunta/"+ perguntaId); // res.redirect/pergunta3
  })
}); 
app.listen(8080, () => {
  console.log("Aoo rodando!");
});
