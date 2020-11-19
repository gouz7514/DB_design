var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("public"));

app.use(cookieParser())
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365	// 쿠키 유효기간 1년
	},
}));

var userDAO = require('./model/dao/userDAO')
app.use(function(req, res, next){
  if(req.cookies.token){
    userDAO.checkToken(req.cookies.token, function(err, result){
      console.log("token checked")
      if(err){
        res.locals.user = ''
        return next(err)
      }
      req.session.user = result
      res.locals.user = result
      return next()
    })
  }else{
    // 로그인을 했을때
    if(req.session.user) res.locals.user = req.session.user
    //안했을때
    else res.locals.user = ''
    return next();
  }
})

// templete엔진 = ejs
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs');

//기본페이지는 index
app.get('/', function (req, res) {
    res.render('index')  //render 해서 index에서 받아가도록
});

// user page
var user = require('./router/user')
app.use('/user', user)

// forum page
var forum = require('./router/forum')
app.use('/forum', forum)

// show page
var show = require('./router/show')
app.use('/show', show)

// error handling
app.use(function (err, req, res, next) {
	console.error(err);
	res.end("<h1>ERROR!</h1>")
});

app.listen(3000, function () {
  console.log('3000번 포트 구동중..');
});
