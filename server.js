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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
}); 

app.get('/:urlToShorten(*)', function (request, response) {
  var { urlToShorten } = request.params;
  console.log(urlToShorten);
  
  //here, you would perform a check on urlToShorten to make sure it is a valid url  
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
  
  response.json(data);
  
});

//query database for shortUrl
app.get('/:urlToForward', (request, response, next)=>{
  var short_url = request.params.urlToForward;
  shortUrl.findOne({'short_url' : short_url}, (err, data)=>{
      //var re = new RegExp();
    var strToCheck = data.original_url;
    
  });
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
