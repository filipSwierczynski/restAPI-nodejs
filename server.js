// "StAuth10065: I Filip Swierczynski , 000348007 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

var express = require('express');
var app = express();

const sqlite3 = require('sqlite3').verbose();
var file = 'api.db';

var db = new sqlite3.Database(file);

db.serialize(()=>{
    db.run("DROP TABLE IF EXISTS users;");
    db.run('CREATE TABLE users (msgid INTEGER PRIMARY KEY, status TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);');
});


app.use(express.json());

app.get('/api',function(req,res){
    db.all("SELECT * FROM users",function(err,row){
        if(err){
            res.send({message: 'READ ERROR'});
        } else {
            res.json(row);
        }
    });
});


app.put('/api',function(req,res){
    var flag = false;
    db.run('DELETE FROM users;');
    for (const key in req.body){
        if(req.body.hasOwnProperty(key)){
            const user = req.body[key];
            db.run('INSERT INTO users VALUES (null,$status,$message,$timestamp)',{
                $status: user.status,
                $message: user.message,
                $timestamp: '2007-01-01 10:00:00'
            },
            (err)=> {
                if(err){
                    console.log(err);
                    flag = true;
                }
            }
        )
        }
    }
    if(flag == true){
        res.send({message:'REPLACE COLLECTION ERROR'});
    } else {
        res.send({message:"REPLACE COLLECTION SUCCESSFUL"});
    }
});


// app.post('/api',function(req,res){
//     db.run('INSERT INTO users VALUES ($status, $message)',
//     {
//         $status: req.body.status,
//         $message: req.body.message
        
//     },
//     (err) =>{
//         if(err){
//             res.send({msg: 'CREATE ENTRY FAILED'});
//         } else {
//             res.send({msg: 'CREATE ENTRY SUCCESSFUL'});
//         }
//     }
//     );
// });


app.post('/api', function(req, res) {
    db.run(
        'INSERT INTO users VALUES (null, $status, $message,$timestamp)',
        {
            $status: req.body.status,
            $message: req.body.message,
            $timestamp: '2007-01-01 10:00:00'
            
        },
        (err) => {
            if (err) {
                res.send({message: 'CREATE ERROR'});
            }
            else {
                res.send({message: 'CREATE ENTRY SUCCESSFUL'});
            }
        }
    );
});

app.delete('/api',function(req,res){
    db.run('DELETE FROM users;',(err)=>{
        res.send({message: 'DELETE COLLECTION SUCCESSFUL'});
        
    });    
});


// app.get(/^(.+)$/,function(req,res){
//     res.sendfile(__dirname + req.params[0]);
// });



app.get('/api/:msgid',function(req,res){
    var query = "SELECT * FROM users WHERE msgid = " + req.params.msgid;
    db.get(query,(err,row)=>{
        if(err) {
            res.send({message: 'READ ITEM ERROR'});
            
        }
        res.json(row);
    });
});



app.put('/api/:msgid',function(req,res){
   db.run('UPDATE users SET status = $status, message = $message, timestamp = $timestamp WHERE msgid = $msgid',{
       $status: req.body.status,
       $message: req.body.message,
       $timestamp: '2007-01-01 10:00:00',
       $msgid: req.params.msgid
   },
   function(err){
       if(!err){
        res.send({message: 'UPDATE ITEM SUCCESSFUL'});
           

       }else{
        res.send({message: 'UPDATE ITEM ERROR'});
          
       }
   });
     
});

app.delete('/api/:msgid',function(req,res){
    var query = "DELETE FROM users WHERE msgid = " + req.params.msgid;
    db.get(query,(err,row)=>{
        if(err){
            res.send({message: 'DELETE ITEM ERROR'});
            
        }else{
            res.send({message: 'DELETE ITEM SUCCESSFUL'});
            
        }
    });
});






var server = app.listen('3000', function(){
    console.log("RESTful API listening on port 3000!");
});