//this is the template/model/structure of the document for shortUrl
//require mongoose

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const urlSchema = new schema ({
  
  original_url : String,
  short_url : String
  
} , {timestamps: true});

const modelClass = mongoose.model('shortUrl', urlSchema);

module.exports = modelClass; //allows us to access this from server.js

