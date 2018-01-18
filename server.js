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

app.get('/new/:userInput(*)', function(request, response){
  
  /*
  possible scenarios:
  -userInput is a valid url ==> generate random number for short url, save orignal and short url to db. response with json
  -userInput is not a valid url, then it is one of either of the following:
      --userInput is an exist short url ==> get original url from db and redirect
      --userInput is garbage ==> redirect to index.html
  */
  
  var userInput = request.params.userInput;
  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  
  
  if(regex.test(userInput)){
    //if userInput is a valid url, then save data to database and display json data
    var newNumber = Math.floor(Math.random() * 10000).toString();
    
    //create new shortUrl object
    var data = new shortUrl({
      original_url : userInput,
      short_url : newNumber
    });
    
    //save to database
    data.save(function(err){
      if(err){
         return response.send("Error saving to database"); 
      }
    });
    //dont forget to handle error
    
    //display json data
    return response.json(data);
  }
  
  alert('Please enter a valid URL');
  
});
  
  app.get('/:userInput', function(request, response){
    
    var userInput = request.params.userInput;
    
 //check if userInput exists in our database
  shortUrl.findOne({'short_url' : userInput} , (err, data)=>{
    if(err){
      return response.send('Error reading database');
    }
    
    //this block of code just takes the original_url in the database and checks to see if it
    //begins with 'http'.  if it doesn't, then it prepends 'http' to data.orignal_url
    //if no http, then response.redirect() will think it is a local file
    if(data !==  null){
        //redirect to orignal url
        var re = new RegExp("^(http|https)://","i");
        var strToTest = data.original_url;
        if(re.test(strToTest)){
          response.redirect(301, data.original_url);                     
        } else {
           response.redirect(301, 'http://' + data.original_url); 
        }
            response.json(data.original_url);
    }else if(data === null){
      //redirect to index.html
      response.sendFile(__dirname + '/views/index.html');
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
