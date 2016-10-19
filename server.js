var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var user_name,password,newPass,newPass1;
var cookie;
// getting index file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/signUp', function(req, res) {
    res.sendFile(path.join(__dirname + '/partials/signUp.html'));
});
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/partials/login.html'));
    cookie = req.cookies.cookieName;
 
});
app.get('/reset', function(req, res) {
    res.sendFile(path.join(__dirname + '/partials/reset.html'));
});

app.get('/home',function(req,res){
  res.sendFile(path.join(__dirname + '/partials/home.html'));
})
app.get('/password', function(req, res) {
    res.sendFile(path.join(__dirname + '/partials/password.html'));
});


 // connecting to mango db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kavitha:kavitha@ds047365.mlab.com:47365/blog";
MongoClient.connect(url, function(err, db) {
  
    var uc=db.collection("users");
    console.log("connected");
    var maxAge,httpOnly;
// login post
app.post('/home', function(req, res) {
    user_name = req.body.username;
    password = req.body.password;
    console.log("name " + user_name+"  pass "+password);
  
    // res.clearCookie('cookiename');
    //  res.send('Cookie deleted');
     uc.find({username:user_name,pass:password}).toArray(function(err,docs){

       if (docs.length){
       	  // creating cookie
      res.cookie('cookieName',user_name, { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
           res.redirect('/home');
        }
        else{
           console.log("username or password incorrect");
           res.redirect('/login');
        }
    });
});


    // signUp post
app.post('/login',function(req,res){
    uc.find({username:user_name},function(err,docs){

       if (docs.length){
            console.log('Name exists already');
            res.redirect('/signUp');
        }
        else{
             if(req.body.password==req.body.reEnter){
             
               uc.insert({username : req.body.username, pass :req.body.password});
               res.redirect('/login');
                  var cookie = req.cookies['cookieName'];
               
             }
         
             else
             {
             	console.log("password mismatch");
             	res.redirect('/signUp');
             }
            }
    });
})

 
  // password post
  app.post('/reset',function(req,res){
          
          user_name = req.body.username;
  	     uc.find({username:user_name}).toArray(function(err,docs){
                  
                 if(docs.length){
                     
                     	res.redirect('/reset');
                     }
                     else{
                     	console.log("invalid user");
                     	res.redirect('/signUp');
                     }
                 
                

             });

});


app.post('/login1',function(req,res){
  
     newPass = req.body.password;
     newPass1 = req.body.newPassword;
     console.log(newPass+ "  "+newPass1)
      if(newPass == newPass1)
      {
               
               uc.update(
               	{"username" :user_name},
               	{
                   $set: {"pass": newPass1}
                  }
               	);
               res.redirect('/login');
      }
      else{
      	console.log("password mismatch");
      	res.redirect('/reset');
      }

});


});
app.listen(3000);



