// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

var urlArr = [];

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:userInput", function (request, response) {
  
  //get userInput
  var userInput = request.params.userInput; //this will either be a url or a random number
  var endPoint = "https://various-glue.glitch.me/";
  var check = endPoint + userInput;

  //check if user input is a shortURL or a new url
  var isShortUrl = false;
  var arrIndex = 0;
  
  for(var i=0; i<urlArr.length; i++){
    if(urlArr[i].short_url === check){
       isShortUrl = true; 
       arrIndex = i;
    }
  }
  
  if(isShortUrl){
      //then reroute to its orignal url
    response.sendFile();
  }
  
  //if userinput is a shortURL:
        //reroute user to its respective long url
  
  //if userinput is a new url:
      //return json data
      //store json data in global array
  
  var endPoint = "https://various-glue.glitch.me/";
  var random = "shortURL/";
  
  var jsonResponse = response.json({
      "original_url" : userInput,
      "short_url" : endPoint + random
  });
  
  
  response.json({
      "original_url" : userInput,
      "short_url" : endPoint + random
  });
  
});


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
