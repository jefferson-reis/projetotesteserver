var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect('mongodb://jefferson-reis:jeff521854@ds261460.mlab.com:61460/testeprojeto', (err, database) => {
    if (err) return console.log(err);
    db = database.db("testeprojeto");
})

app.listen(8080, () => {
    console.log("listen on 8080")
});

app.post("/user", (req,res) => {

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let dados = {
        nome: nome,
        email: email,
        senha: senha,
    };

    
    db.collection('usuarios').insertOne(dados, (err, result) => {

        if(err) {

            return res.json({ erro: true });

        }

        return res.json({ erro: false, resultado: result})

    });

});

app.get("/user/:senha", (req,res) => {

    let senha = req.params.senha;


    db.collection('usuarios').find({senha:senha}).toArray((err, result) => {

        if(err) {
    
            console.error(JSON.stringify(err));
    
            res.json({ erro: true, mensagem: JSON.stringify(err) });
    
        } else {
    
            res.json({ erro: false, resultado: result });
    
        }
    
    });
})






app.post("/login", (req,res) => {

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let dados = {
        email: email,
        senha: senha,
    };

    
    db.collection('usuarios').find(dados).toArray((err, result) => {
  

        if(err) {
    
            console.error(JSON.stringify(err));
    
            res.json({ erro: true, mensagem: JSON.stringify(err) });
        }
       
       
        if(result.length > 0){

            return res.json({resultado: result})

        } else {
    
            return res.json({ erro: true, mensagem: "e-mail ou senha incorretos" });
        }

    });

});
    