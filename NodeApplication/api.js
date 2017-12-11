"use strict";

const express = require("express");
const EventEmitter = require("events");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
const app = express();

app.listen(3000);
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let poem = ["У лукоморья дуб зелёный;",
             "Златая цепь на дубе том:",
             "И днём и ночью кот учёный",
             "Всё ходит по цепи кругом,",
             "Идёт направо  песнь заводит;",
             "Налево - сказку говорит.",
             "Там чудеса: там леший бродит,",
             "Русалка на ветвях сидит;",
             "Там на неведомых дорожках",
             "Следы невиданных зверей;",
             "Избушка там на курьих ножках",
             "Стоит без окон, без дверей;",
             "Там лес и дол видений полны;",
             "Там о заре прихлынут волны",
             "На брег песчаный и пустой,",
             "И тридцать витязей прекрасных",
             "Чредой из вод выходят ясных,",
             "И с ними дядька их морской;",
             "Там королевич мимоходом",
             "Пленяет грозного царя;",
             "Там в облаках перед народом",
             "Через леса, через моря",
             "Колдун несёт богатыря;",
             "В темнице там царевна тужит,",
             "А бурый волк ей верно служит;",
             "Там ступа с Бабою Ягой",
             "Идёт, бредёт сама собой,",
             "Там царь Кащей над златом чахнет;",
             "Там русский дух... там Русью пахнет!",
             "И там я был, и мёд я пил;",
             "У моря видел дуб зелёный;",
             "Под ним сидел, и кот учёный",
             "Свои мне сказки говорил."];

function getRandom(min, max, num) {

    return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
    
}
app.get("/poem", (req, res) => {

   res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
   });

   let counter = 0;

   function Timer(count){

      let timeStart  = +new Date();
      let temp = getRandom(1000, 5000, 1000)

      setTimeout(function() {
         res.write(`<p style="margin-left: 40%">${poem[count]}</p>`);
         if(count < poem.length - 1) {
            Timer(++count);
         } else {
            res.end();
         }

         let timeEnd  = +new Date();

      }, temp);
   } 

   Timer(counter);

});
app.get("/todo", (req, res) => {

    let url = "mongodb://localhost:27017/toDoDb";
    let toDoList;
    let allDocuments;

    MongoClient.connect(url, (err, db) => {

        toDoList = db.collection("toDoList");

        toDoList.find().toArray((err, todos) => {
            allDocuments = todos;
            db.close();
            res.json(allDocuments);
         });   
    });

});

app.post("/todo/:title/:text/:status", (req, res) => {

    let url = "mongodb://localhost:27017/toDoDb";
    let currentTime = new Date();

    let item = {
        title: req.param("title"),
        text: req.param("text"),
        status: req.param("status"),
        createAt: currentTime.toString(),
        changeAt: currentTime.toString()
    }

    MongoClient.connect(url, function(err, db) {
        
        let toDoList = db.collection('toDoList');

        if(err){
            db.close();
            res.end();
            ruturn ;
        }

        toDoList.insertOne(item, (err, todos) => {
            db.close();
            res.end();
        });
    });

});

app.put("/todo/:id/:title/:text/:status", (req, res) => {

    let url = "mongodb://localhost:27017/toDoDb"
    let toDoList;
    let item;

    MongoClient.connect(url, (err, db)=>{

        toDoList = db.collection('toDoList');

        toDoList.updateOne(
            {
                "_id": ObjectId(req.param("id"))
            }, 
            {
                $set: {
                    title: req.param("title"),
                    text: req.param("text"), 
                    status: req.param("status"), 
                    changeAt: new Date().toString()
                }
            },  
            (err, Item) => {
            Item.text = req.param("text");
            db.close();
            res.end();
         });
    });

});
app.delete("/todo/:id", (req, res) => {

    let url = "mongodb://localhost:27017/toDoDb"
    let toDoList;

    MongoClient.connect(url, (err, db)=>{
        toDoList = db.collection('toDoList');
        toDoList.deleteOne( {"_id": ObjectId(req.param("id"))}, (err, Item) => {
            db.close();
            res.end();
        });
    });
});

app.use("/newtodo", (req, res) => {

    let url = "mongodb://localhost:27017/toDoDb";
    
    MongoClient.connect(url, function(err, db) {
        let toDoList = db.collection('toDoList');

        if( Object.is(req.method, "GET") ) {

            toDoList.find().toArray( (error, todos) => {
                res.json(todos);
                res.end(); 
                db.close(); 
            });  
        } else if( Object.is(req.method, "POST") ) {

            let item = {
                title: req.body.title,
                text: req.body.text,
                status: req.body.status,
                createAt: new Date().toString(),
                changeAt: new Date().toString()
            };

            if(err){
                db.close();
                res.end();
                ruturn ;
            };
    
            toDoList.insertOne(item, (err, todos) => {
                db.close();
                res.end();
            });
        } else if( Object.is(req.method, "PUT") ) { 

            toDoList.updateOne(
                {
                    "_id": ObjectId(req.body._id)
                }, 
                {
                    $set: {
                        title: req.body.title,
                        text: req.body.text, 
                        status: req.body.status, 
                        changeAt: new Date().toString()
                    }
                },  
                (err, Item) => {
                    db.close();
                    res.end();
                }
            );
        } else if( Object.is(req.method, "DELETE") ) { 

            toDoList.deleteOne( {"_id": ObjectId(req.body._id) }, (err, Item) => {
                db.close();
                res.end();
            });
        };
    });
});




/*{
	"title": "one",
	"text": "two",
	"status": 0
}
*/