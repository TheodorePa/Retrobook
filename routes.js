module.exports = function(app) {

	var express = require('express');
  var mongoose = require('mongoose');
  var retro = require("./models/signup");
  var router = express.Router();

app.get('/', function(req, res) {

    res.render('intro.ejs');
   
});


app.post('/signup', function(req, res) {

    var name= req.body.name; 
    var email = req.body.email;
    var password = req.body.password;	
    
    var cred= new retro ({ name:name,email:email,password:password}); 
     
      cred.save( function(err, newUser) {
      if(err) return next(err);
      req.session.cred = name;      
      return res.send('Logged In!');
      console.log(newUser);
    });
  });

app.get('/signup', function(req, res) {

    res.render('signup.ejs');
   
});

app.get('/login', function(req, res) {

    res.render('login.ejs');
   
});

app.post('/login', function (req, res, next) {
   var email = req.body.email;
   var password = req.body.password;

   retro.findOne({email:email,password:password}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Not logged in!');

      req.session.user = email;
      return res.send('Logged In!');
   });
});

app.get('/logout', function (req, res) {
   req.session.user = null;
});

//LoggedIn or Not
function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.user)) {
    return res.send('Not logged in!');
  }
  next();
 }
} 

