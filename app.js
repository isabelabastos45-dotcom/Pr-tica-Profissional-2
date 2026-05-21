var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var dataRouter = require('./routes/data');
var signupRouter = require('./routes/signup');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');

var connectDatabase = require('./database/db');
var app = express();

connectDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);
app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);

app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).send('Página não encontrada - 404');
});

module.exports = app;