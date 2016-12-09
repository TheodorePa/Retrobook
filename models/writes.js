var mongoose = require("mongoose");

var writeSchema = mongoose.Schema({
  name: { type: String },
  password: {type: String},
  email: {type: String},
  file:{type: String},
  write:{type:String},
  createdAt: { type: Date, default: Date.now }
});

var writes = mongoose.model("writes", writeSchema);
module.exports = writes;