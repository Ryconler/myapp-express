var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var a=0
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter=require("./routes/games")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));   //设置视图的目录
app.engine('html', require('ejs').renderFile);  //使用ejs引擎渲染html文件
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//自定义路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/games",gamesRouter)

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
