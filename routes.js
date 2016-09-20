module.exports = function(app) {

	var express = require('express');
  var mongoose = require('mongoose');
  var retro = require("./models/signup");
  var router = express.Router();

app.get('/', function(req, res) {

    res.render('intro.ejs');
   
});


app.post('/signup', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;	
    
    var cred= new retro ({ name:req.body.name,password:req.body.password}); 
     
        cred.save(function(err,creds) {

         // console.log(creds);

         if(err) return next(err);
         req.session.user = name;
         return res.redirect('profile');       

      });   
    });

app.get('/profile',isLoggedIn, function(req, res) {

    res.render('profile.ejs');
   
});

function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.user)) {
    return res.send('Not logged in!');
  }
  next();
}
} 

