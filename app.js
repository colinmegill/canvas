var express = require('express');
var app = express();

// var canvasDataClobberedEachTime = 

var inMemoryStore = {
};


var nouns= [
  '/api/segments',
  '/api/relationships',
  '/api/channels',
  '/api/revenue',
  '/api/valueProp',
  '/api/activities',
  '/api/resources',
  '/api/partners',
  '/api/costs'
];

function poster(req, res){
  var key = req.route.path;
  inMemoryStore[key] = JSON.stringify(req.body);
  //inMemoryStore[key] = 5;
  res.send(key);
}

function getter(req, res) {
  var key = req.route.path;
  var s = "";
  if (inMemoryStore[key]) {
    s = inMemoryStore[key];
    res.send(s + " " + key);
  } else {
    res.status(404).end(key);
  }
}

app.use(express.bodyParser());
nouns.forEach(function(name) {
  app.get(name, getter);
  app.post(name, poster);
});

app.use('/', express.static(__dirname+'/static'));
app.use('/static', express.static(__dirname+'/static'));
app.listen(3000);