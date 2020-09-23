var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var http = require('http');
var path = require('path');
////////////////////////

var fs = require('fs');
var https = require('https');
var app = require('express')();
var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var restaurant = require('./routes/restaurant');

var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');

// view engine setup
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'restaurant',
        resave:true,
      saveUninitialized:true}));

app.use('/', index);
app.use('/users', users);
app.use('/restaurant', restaurant);

https.createServer(options, app).listen(4301, function () {
   console.log('Started HTTPS on  4301.............!');
    
});


//////////////////////////


var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var restaurant = require('./routes/restaurant');

var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');

// view engine setup
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'restaurant',
        resave:true,
      saveUninitialized:true}));

app.use('/', index);
app.use('/users', users);
app.use('/restaurant', restaurant);

// conncet to jar file that invoke the gateway for testin the payment gateway
//var exec = require('child_process').exec;
//var child = exec('/Library/java/JavaVirtualMachines/jdk1.8.0_77.jdk/Contents/Home/bin/java -cp /Users/akingboladeshada/uob/quickteller07/dist/quickteller07.jar com.interswitchng.services.quicktellerservice.TestMain1 ',
//  function (error, stdout, stderr){
//    console.log('Output -> ' + stdout);
//    if(error !== null){
//      console.log("Error -> "+error);
//    }
//});
 
//module.exports = child;






app.use(
    connection(mysql,{
        connectionLimit : 10000,
        host: 'localhost',
        user: 'root',
        password : 'oluwatobiloba1998OLADELE?',
        port : 3306, //port mysql
        database:'restaurant'
    },'request')
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
  console.log('Express server listening on port ' + app.get('port'));
/*http.createServer(app).listen(app.get('port'), function(){
    console.log('Started HTTP on  4300.............!');
    console.log('Express server listening on port ' + app.get('port'));
});
*/


////////////////
var util = require('util'),
    bodyParser = require('body-parser'),
    express = require('express'),
    expressValidator = require('express-validator'),
    app = express();
 
app.use(bodyParser.json());
//app.use(expressValidator([options])); 
 
app.post('/:urlparam', function(req, res) {
 
  
  // VALIDATION 
  // checkBody only checks req.body; none of the other req parameters 
  // Similarly checkParams only checks in req.params (URL params) and 
  // checkQuery only checks req.query (GET params). 
  req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid getparam').isInt();
 
  // OR assert can be used to check on all 3 types of params. 
  // req.assert('postparam', 'Invalid postparam').notEmpty().isInt(); 
  // req.assert('urlparam', 'Invalid urlparam').isAlpha(); 
  // req.assert('getparam', 'Invalid getparam').isInt(); 
 
  // SANITIZATION 
  // as with validation these will only validate the corresponding 
  // request object 
  req.sanitizeBody('postparam').toBoolean();
  req.sanitizeParams('urlparam').toBoolean();
  req.sanitizeQuery('getparam').toBoolean();
 
  // OR find the relevent param in all areas 
  req.sanitize('postparam').toBoolean();
 
  // Alternatively use `var result = yield req.getValidationResult();` 
  // when using generators e.g. with co-express 
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    res.json({
      urlparam: req.params.urlparam,
      getparam: req.params.getparam,
      postparam: req.params.postparam
    });
  });
});
 
//app.listen(4300);


////////////////


