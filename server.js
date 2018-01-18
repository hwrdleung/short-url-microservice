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


app.get('/:urlToShorten(*)', function (request, response) {
  
  var { urlToShorten } = request.params;
  
  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  
    
  if(regex.test(urlToShorten)){
    //if urlToShorten passes Regex test, then it is a valid url.
    //generate a random number to create a new shortURL for urlToShorten
    //save this data to database using Object.save();
    var randomNumber = Math.floor(Math.random() * 100000).toString();
    var data = new shortUrl({
      original_url: urlToShorten,
      short_url: randomNumber
    });
    
    data.save(err=>{
      if(err){
         return response.send('Error saving to database');
      }
    });
    
    return response.json(data);
  } 
  
  var data = new shortUrl({
    original_url : urlToShorten,
    short_url : "Invalid URL"
  });
  return response.json(data);
});


//if shortURL is entered, redirect to its corresponding original url
//query database and forward orignal url
app.get(':/urlToForward', (request, response, next)=>{
    //stores value of short url
    var { shorterUrl } = request.params.urlToForward; 
    //findOne() allows us to pass in an object and see if it exists in the database
  
  //check these variables
  shortUrl.findOne({'shorterUrl' : shorterUrl} , (err, data)=>{
    if(err){
     return response.send("Error reading database"); 
    }
  
    var re = new RegExp("^(http|https)://","i");
    var strToTest = data.original_url;
    if(re.test(strToTest)){
      response.redirect(301, data.original_url);                     
    } else {
       response.redirect(301, 'http://' + data.original_url); 
    }
  });
    
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
