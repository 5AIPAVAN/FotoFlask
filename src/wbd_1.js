var express = require('express');
var app = express();
var myLogger = function(req,res,next){
    console.log('LOGGED');
    next()
}

var requestTime = function(req,res,next){
    req.requestTime = Date.now();
    console.log(req.requestTime);
    next();
}
//app.use(myLogger)cd

app.get('/',requestTime,function(req,res){
   // res.send('hello world')
   var responseText=`<h3>Requeted at: `+req.requestTime+`</h3>` 
   res.send(responseText)
})

app.get('/login',myLogger,function(req,res){
    res.send('login page')
})

app.get('/home',function(req,res){
    res.send('home page')
})

app.listen(3000)