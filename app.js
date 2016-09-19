var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var routes = require( './routes' );

// mongoose.connect("mongodb://localhost/retro", function (error){
   
//    if (error) console.error(error);
//    else console.log("mongo connected")

// });
app.set("port", process.env.PORT || 80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get(  '/',routes.routes );

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});

