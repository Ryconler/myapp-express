var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/RouterIndex');
var usersRouter = require('./routes/RouterUsers');
var otherRouter = require('./routes/RouterOther');
var loveRouter = require('./routes/RouterLove');
var petRouter = require('./routes/RouterPet');

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
// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

//自定义路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/other', otherRouter);
app.use('/love', loveRouter);
app.use('/pet', petRouter);

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
