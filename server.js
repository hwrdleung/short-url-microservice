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
  var urlPattern = new RegExp(
  
    '(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?:].*)?'
    
  );
  
  if(!urlPattern.test(userInput)) {

    var original_url;
    
    //query database for shortUrl
    userInput.findOne({'short_url' : userInput}, (err, data)=>{
      //var re = new RegExp();
    original_url = data.original_url;
  
        });
    
    response.redirect(original_url);
        
  } else {
    
  var short = Math.floor(Math.random()*100000).toString();
  var data = new shortUrl({
    original_url : userInput,
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
