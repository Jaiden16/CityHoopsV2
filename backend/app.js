var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors')


// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const skillsRouter = require('./routes/skills');
const welcomeRouter = require('./routes/welcome');

var app = express();

app.listen(console.log(process.env.PORT))
app.listen(console.log(process.env.DATABASE_URL))



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',welcomeRouter);
app.use("/api/users",usersRouter);
app.use("/api/skills",skillsRouter);



// app.use((err,req,res,next) =>{
//    console.log(err);
//    if(err.status){
//        res.status(err.status).json(err)
//    }else{
//        res.status(500)
//    } 
// })

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
