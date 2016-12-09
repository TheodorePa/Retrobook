var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var multer  = require('multer');
var flash = require('connect-flash');
var methodOverride = require('method-override')
// var formidable = require('formidable');
// var util = require('util');
// var fs   = require('fs-extra');
// var qt   = require('quickthumb');

var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); 

<<<<<<< HEAD
app.use(methodOverride('_method'));
=======
>>>>>>> origin/master
app.use(cookieParser('bla'));
app.use(expressSession({secret:'bla2'}));

//app.use(qt.static(__dirname + '/'));

var routes = require( './routes' );
var retro    = require("./models/signup");

mongoose.connect("mongodb://localhost/bla3", function (error){
   
   if (error) console.error(error);
   else console.log("mongo connected")

});

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(flash());

require('./routes.js')(app);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});

