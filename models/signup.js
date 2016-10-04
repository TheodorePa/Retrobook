var mongoose = require("mongoose");

var retroSchema = mongoose.Schema({
  name: { type: String,required: true },
  password: {type: String,required: true},
  email: {type: String,required: true},
  file:{type: String,required: true}, 
  private:{type: String},   
  createdAt: { type: Date, default: Date.now }
});


var retro = mongoose.model("retro", retroSchema);

module.exports = retro;

