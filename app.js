var express = require('express');
var app = express();
var mongo = require('mongodb');


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



/* TEMPLATE FOR POST REQUEST WITH EXPRESS HELPERS

app.post("/v2/feedback",
    express.bodyParser(),
    function(req, res) {
                var data = req.body;
                    data.events.forEach(function(ev){
                        if (!ev.feedback) { fail(res, 'expected feedback field'); return; }
                        if (data.u) ev.u = ObjectId(data.u); 
                        checkFields(ev);
                        collection.insert(ev, function(err, cursor) {
                            if (err) { fail(res, 324234331, err); return; }
                            res.end();
                        }); // insert
                    }); // each 
    });

*/







function genericPostHandler(req, res){
  
  var type = req.route.path;
  entries.insert({type: type, title: req.body.title}, function(err, completed){
    if (err){
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  })

  

}



function genericGetter(req, res) {
  
  var type = req.route.path;
  entries.find({type: type}, function(err, cursor){
    if (err) {
      res.send(500).end();
    } else {
      cursor.toArray(function(err, docs){
        if(err){
          res.send(500).end()
        } else {
          res.json(docs);
        }
      });
    }
  });
};


 
mongo.connect("mongodb://heroku_app15573541:3vi67f8qfs8vbimtt5n2psmeoq@ds061757.mongolab.com:61757/heroku_app15573541", { 
    server: {
        auto_reconnect: true
    },
    db: {
        safe: true
    }
}, function(err, db) {
    if(err) {
        console.error('mongo failed to init');
        console.error(err);
        process.exit(1);
    }

    db.collection('events', function(err, collection) {
        // OK, DB is ready, start the API server.
        initializeTheWorld({
            mongoCollectionOfBoxEntries: collection,
        });
    });
});

var initializeTheWorld = function(params) {
  global.entries = params.mongoCollectionOfBoxEntries;
  app.listen(3000);

}







app.use(express.bodyParser());
nouns.forEach(function(name) {
  app.get(name, genericGetter);
  app.post(name, express.bodyParser(), genericPostHandler);
});

app.use('/', express.static(__dirname+'/static'));
app.use('/static', express.static(__dirname+'/static'));
