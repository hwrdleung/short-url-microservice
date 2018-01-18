// server.js
// where your node app starts

// init project
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var shortUrl = require('./models/shortUrl');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

//connect to our database (mongodb)
mongoose.connect('mongodb://noodles01:renewel010@ds163226.mlab.com:63226/noodlesdb');

//reroute to index.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
}); 


app.get('/:userInput(*)', function (request, response) {
  var { userInput } = request.params;
  
  //check if urlToShorten is a URL
  //THANK YOU STACKOVERFLOW  
  var urlPattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  
  if(!urlPattern.test(userInput)) {

    //query database for shortUrl
    userInput.findOne({'short_url' : short_url}, (err, data)=>{
      //var re = new RegExp();
    var original_url = data.original_url;
      
    
    
    response.redirect(origina_url);
    
    
  } else {
    
  var short = Math.floor(Math.random()*100000).toString();
  var data = new shortUrl({
    original_url : urlToShorten,
    short_url : short
  });
  
  data.save(err=>{
    if(err){
     return response.send("Error saving to db"); 
    }
  });
  
  response.json(data);  }
    
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
