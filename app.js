var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');

var app = express();
var router = express.Router();

// view engine setup
app.set("view engine", "ejs");
// app.use(expressLayout);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('SecretStringForCookies'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'SecretStringForCookies',
  cookie:{ maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.get("/", (req,res) => {
   res.render('pages/coba')
})
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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