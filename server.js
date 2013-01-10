
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongoskin');
  //, db = mongo.db('tamatyandesu:aiueokaki@linus.mongohq.com:10069/hetiman',{safe:true});//mongodb

var app = express();
var server = http.createServer(app);
var log = console.log;

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/get', routes.get);
app.get('/test', routes.test);
app.get('/users', user.list);
app.get('/about', function(req, res){
    res.end('this site');
});

app.post('/test', routes.test);



server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + process.env.PORT);
  //db.collection('dudley').find().toArray(function(err, items){
    //    console.dir(items);
  //});
  
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    log('接続しました');
    //console.log('接続しました');
    //socket.send('接続しました');
    
    socket.on('msg send', function(msg){
        socket.emit('msg push', msg);
        //socket.broadcast.emit('msg push', msg);
    });
    
    socket.on('disconnect', function(){
        log('disconnected');
    })
    
});
















