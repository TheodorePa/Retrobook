module.exports = function(app) {
  
  var express = require('express');
  var mongoose = require('mongoose');
  var retro = require("./models/signup");
  var writes = require("./models/writes");
  var privates = require("./models/privates");
  var router = express.Router();
  var multer  = require('multer');

  // var formidable = require('formidable');
  // var util = require('util');
  // var fs   = require('fs-extra');
  // var qt   = require('quickthumb')

//  app.post('/uploads', function (req, res){
//   var file= req.body.file; 
//   var form = new formidable.IncomingForm();
//   form.parse(req, function(err, fields, files) {
//     console.log(req.body);   
//     res.redirect('back');
    
//   });

//   form.on('end', function(fields, files) {
   
//     var temp_path = this.openedFiles[0].path;
   
//     var file_name = this.openedFiles[0].name;
 
//     var new_location = 'uploads/';

//     fs.copy(temp_path, new_location + file_name, function(err) {  
//       if (err) {
//         console.error(err);
//       } else {
//         console.log("success!")
//       }
//     });
//   });
// });
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     console.log("Dest");
     cb(null, 'public/images')
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname )//fieldname + '-' + Date.now()
   }
});

 app.get("/profile/:name/private", isLoggedIn, function(req, res, next) {

    var name= req.params.name;
    var private = req.params.private; 
     var photos =  req.params.photos;

    console.log(name);              


    privates.find({name:name})
      .sort({ createdAt: "descending" })
      .exec(function(err, user) {
        if (err) { return next(err); }
        if (!user ) { res.redirect("back")};
        res.render("prive.ejs", { user: user}); 
      });
    });
     
var upload = multer({ storage: storage });
 app.post("/profile/:name/private", upload.single('photos'), isLoggedIn, function(req, res, next) {

      var name=  req.session.user; 
      var private= req.body.private;
      var photos = req.file.originalname; 
    
      retro.findOne({ name: name }, function(err, user) {

     var creds= new privates({name:name, private:private, photos:photos}); 

     // console.log(req.body)
    
    creds.save( function(err) {

    if(err) return next(err);
    if (!user ) { res.redirect("back")};  
    console.log(user);
    return res.redirect('/profile/'+name+'/private');   
    
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
var upload = multer({ storage: storage });

app.post('/signup', upload.single('file'), function(req, res) {
    
    var name= req.body.name; 
    var email = req.body.email;
    var password = req.body.password;	
    var file = req.file.originalname;
    
    var cred= new retro ({ name:name,email:email,password:password, file: req.file.originalname}); 
     // console.log(req.body)
     // console.log(req.file.originalname)
    cred.save( function(err, newUser) {

    if(err) return next(err);
    // req.flash('error', err.message);
    //req.session.cred = name;  
     req.session.user = name; 
    //return res.send("login");
    return res.redirect('/profile/'+name+''); 
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
   res.redirect("/")
});

 app.get('/login', function(req, res,next) {

  if (req.session.user) 
   return res.redirect("/profile/"+req.session.user+"");  
    
   return res.render('login');
  
});

app.get("/profile/:name",  function(req, res, next) {
 
  var name = req.params.name;
  var write = req.params.write;
  //console.log('req.body',req.params);
  
  retro.findOne({ name: name }, function(err, user) {


    if (err)  return next(err);  
    console.log(user);     
    res.render("profile.ejs", { user: user });
    
  });
});

app.post("/profile/:name", isLoggedIn,function(req, res, next) {
  
  var name = req.session.user;
  var write = req.body.write;
  var file = req.params.file;
  //console.log('req.body',req.params);

  retro.findOne({ name: name }, function(err, user) {

  var creds= new writes ({name:name, write:write, file:file}); 

  console.log(user)
   
  creds.save( function(err) {
     
  if(err) return next(err);
      
  console.log(user);
  return res.redirect('/profile/'+name+'/home'); 
     
      });
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

 app.get("/profile/:name/home", isLoggedIn, function(req, res, next) {

  
   var name=req.params.name;
   var file=req.params.file;
   var write=req.params.write;

   console.log('req.body',req.params);
   writes.find()
  .sort({ createdAt: "descending" })
  .exec
   ( function(err, user) {

    //if (err) { return next(err); }
     // console.log("dasdasd"+user);
     // console.log(req.params);

 console.log('req.body',req.params);  
 res.render("home.ejs", { user: user });
    
   });
 });


// app.get("/profile/:name/news", function(req, res, next) {

//   var name=req.params.name;
//   console.log('req.body',req.params);

//   retro.findOne({ name: req.params.name }, function(err, user) {

//     if (err) { return next(err); }
//     console.log(user);

//     res.render("news.ejs", { user: user });
    
//   });
// });


function isLoggedIn (req, res, next) {

  if (!(req.session && req.session.user)) {
    return res.send('You are not a good person!');
  }
  next();
 }
} 


