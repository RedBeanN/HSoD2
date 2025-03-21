var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
var cms = require('./routes/cms');
var battle = require('./routes/battle');
var buglist = require('./routes/bug-list');
var gacha = require('./routes/gacha');
var illustrate = require('./routes/illustrate');
var innerWorld = require('./routes/innerWorld');

var app = express();

// user compression
app.use(compression());

// force https
app.all('*', (req, res, next) => {
  if(req.protocol !== 'https') {
    let resp = 'https://' + req.hostname + req.url;
    res.redirect(resp);
  } else if (req.url === '/index.html') {
    res.redirect('https://' + req.hostname + '/');
  } else next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/illustrate', illustrate);
app.use('/users', users);
app.use('/list', list);
app.use('/cms', cms);
app.use('/worldbattle', battle);
app.use('/buglist', buglist);
app.use('/gacha', gacha);
app.use('/innerWorld', innerWorld);

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
