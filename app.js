var express = require('express');
var engine = require('ejs-locals'); // 追加
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); // 追加

var routes = require('./routes/index');
var users = require('./routes/users');
var boards = require('./routes/boards');
var register = require('./routes/register');
var login = require('./routes/login');
var setUser = require('./setUser'); // 追加
var logout = require('./routes/logout'); // 追加


var app = express();

// view engine setup
app.engine('ejs', engine); // 追加
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', setUser, routes); // 変更
app.use('/users', users);
app.use('/boards', setUser, boards); // 変更
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  if( err ) {
    console.log(err);
    return;
  } //付け足してみた
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
