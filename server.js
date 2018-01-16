// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();



// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:userInput", function (request, response) {
  
  var userInput = request.params.userInput;
  var endPoint = "https://various-glue.glitch.me/";
  var random = "shortURL/";
  
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