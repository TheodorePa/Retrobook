module.exports = function(app) {

	var express = require('express');
  var mongoose = require('mongoose');
  var retro = require("./models/signup");
  var router = express.Router();

app.get('/', function(req, res) {
     var name= req.body.name; 
    retro.findOne({ name:name }, function(err, user) {

    if (err) { return next(err); }  

    console.log('req.body',req.body);
    res.render("intro.ejs", { user: user});
  });   
});

app.get('/profile', function(req, res) {

    res.render('profile.ejs');
   
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

 app.post('/login', function (req, res,next) {

    var name = req.body.name;
    var password = req.body.password;
    retro.findOne({name:name,password:password}, function(err, user) {

     if(err) return next(err);
     if(!user) return res.render('login.ejs');

       req.session.user = name;
      
      //return res.send('Logged In!');
      
       return res.redirect('/profile/'+name+'');      
    });
 });

app.get('/logout', function (req, res) {
   req.session.user = null;

});

 app.get('/login', function(req, res,next) {

  if (req.session.user) 
   return res.redirect("/profile/"+req.session.user+"");  
    
   return res.render('login');
  
});

app.get("/profile/:name", function(req, res, next) {

  var name=req.params.name;
  console.log('req.body',req.params);

  retro.findOne({ name: req.params.name }, function(err, user) {

    if (err) { return next(err); }
    console.log(user);
    res.render("profile.ejs", { user: user });
    //res.render("profile", { user: user });
  });
});



function isLoggedIn (req, res, next) {

  if (!(req.session && req.session.user)) {
    return res.send('Not logged in!');

  }
  next();
 }
} 


