module.exports = function(app) {
  
  var express = require('express');
  var mongoose = require('mongoose');
  var retro = require("./models/signup");
  var router = express.Router();
  var formidable = require('formidable');
  var util = require('util');
  var fs   = require('fs-extra');
  var qt   = require('quickthumb')

 app.post('/uploads', function (req, res){
  var file= req.body.file; 
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(req.body);   
    res.redirect('back');
    
  });

  form.on('end', function(fields, files) {
   
    var temp_path = this.openedFiles[0].path;
   
    var file_name = this.openedFiles[0].name;
 
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});
 

app.get('/', function(req, res) {

    var name= req.body.name; 
    retro.findOne({ name:name }, function(err, user) {

    if (err) { return next(err); }

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
    var file = req.body.file;

    var cred= new retro ({ name:name,email:email,password:password, file:file}); 
     console.log(req.body)
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
    
  });
});

app.get("/profile/:name/members", function(req, res, next) {

   
  console.log('req.body',req.params);

  retro.find()
  .sort({ createdAt: "descending" })
  .exec(function(err, members) {
    if (err) { return next(err); }
    res.render("members", { members: members });
  });
});

app.get("/profile/:name/home", function(req, res, next) {

  var file= req.params.file;
  var name=req.params.name;
  console.log('req.body',req.params);

  retro.findOne({ name: req.params.name }, function(err, user) {

    if (err) { return next(err); }
    console.log(user);
    
    res.render("home.ejs", { user: user });
    
  });
});



app.get("/profile/:name/news", function(req, res, next) {

  var name=req.params.name;
  console.log('req.body',req.params);

  retro.findOne({ name: req.params.name }, function(err, user) {

    if (err) { return next(err); }
    console.log(user);

    res.render("news.ejs", { user: user });
    
  });
});


function isLoggedIn (req, res, next) {

  if (!(req.session && req.session.user)) {
    return res.send('Not logged in!');

  }
  next();
 }
} 


