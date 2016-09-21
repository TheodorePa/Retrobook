var mongoose = require("mongoose");

var retroSchema = mongoose.Schema({
  name: { type: String },
  password: {type: String},
  email: {type: String} 
});


var retro = mongoose.model("retro", retroSchema);

module.exports = retro;

