var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, 
//so we use this to parse it
app.use(cookieParser());
app.use(expressSession({secret:'secretsmanysecrets'}));

var routes = require( './routes' );
var retro    = require("./models/signup");

mongoose.connect("mongodb://localhost/retro1", function (error){
   
   if (error) console.error(error);
   else console.log("mongo connected")

});

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes.js')(app);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});

