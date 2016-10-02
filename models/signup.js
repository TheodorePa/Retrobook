var mongoose = require("mongoose");

var retroSchema = mongoose.Schema({
  name: { type: String },
  password: {type: String},
  email: {type: String},
  file:{type: String}, 
  private:{type: String},   
  createdAt: { type: Date, default: Date.now }
});


var retro = mongoose.model("retro", retroSchema);

module.exports = retro;

