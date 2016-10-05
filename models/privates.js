var mongoose = require("mongoose");

var privateSchema = mongoose.Schema({
  name: { type: String }, 
  photos: { type: String },
  private:{type:String},
  createdAt: { type: Date, default: Date.now }

});


var privates = mongoose.model("privates", privateSchema);

module.exports = privates;