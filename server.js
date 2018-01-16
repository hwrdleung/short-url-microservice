// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fs = require('fs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:userInput", function (request, response) {
  
  //get userInput
  var userInput = request.params.userInput; 
  var endPoint = "https://various-glue.glitch.me/";
  var check = endPoint + userInput;
  var reroute = "";
  var endPoint = "https://various-glue.glitch.me/";
  var random = "lol";

  //check if user input is a shortURL or a new url
  var isShortUrl = false;
  var arrIndex = 0;
  
  var test = {
    "it":"works"
  }
  
  fs.writeFileSync('shortUrl.json', test);
  
  if(isShortUrl){
      //then reroute to its orignal url
    response.sendFile(reroute);
  }else if(!isShortUrl){
    
    var jsonResponse = {
      "original_url" : userInput,
      "short_url" : endPoint + random
     };
        
    //write to shorUrl.json
    fs.writeFileSync('shortUrl.json', jsonResponse);
  
    response.json(jsonResponse);
    
  }  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
