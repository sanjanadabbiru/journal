
// BACKEND-SERVER SIDE

var express = require("express");
 app = express();
 //const bcrypt = require('bcrypt');
var router = express.Router();
var bodyparser = require("body-parser");
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");



/*router.post('/login/adduser', (req, res) => {
	res.render('login',{ 
		data:req.body
	});
	res.send('Sent' + JSON.stringify(req.body));
	});
*/
//************************************************************* *//
var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

const config =require ('./config/databse');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//app.use('/users', usersRouter);

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
 // res.render('error');
});

module.exports = app;



//TIME 

var logs = [];
var time, date, month;

setInterval(function(){
	var t = new Date();
	var hours = t.getHours();
	var min = t.getMinutes();
	var sec = t.getSeconds();
	month = t.getMonth();
	date = t.getDate();
	time = hours + ":" + min + ":" + sec;
});


app.post("/post", function(req, res){
	var log = req.body.log;
	// var t = time;
	var entry = {
		log_date: date,
		log_time: time,
		data: log
	};
	console.log(entry.data);
	if(log !== ""){
		logs.push(entry);
	
	}
	res.redirect("/");
	
});

app.post("/del/:logNum", function(req, res){
	var pos = req.params.logNum;
	logs.splice(pos, 1);
	res.redirect("/");
});	



app.get("/", function(req, res){
	res.render("home", {logs: logs});
});

app.get("/about", function(req, res){
	res.render("about");
});

//app.get("/login", function(req, res){
//	res.render("login");
//});

app.get("/chat", function(req, res){
	res.render("chat");
});



app.listen(3000, function(){
	console.log("Server is running");
});

