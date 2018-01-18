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
  
    
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
