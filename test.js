var http = require('http'),
   mongo = require('mongoskin');

http.createServer(function (req, res) {

  var conn = mongo.db('tamatyandesu:aiueokaki@linus.mongohq.com:10069/hetiman');
  conn.collection('ladies').find({area_codes:503}).toArray(function(err, items){
    if(err) throw err;

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(items));
  });

}).listen(process.env.C9_PORT, "0.0.0.0");
console.log('Server running...');