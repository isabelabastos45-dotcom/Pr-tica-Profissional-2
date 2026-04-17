var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var dataRouter = require('./routes/data');
var signupRouter = require('./routes/signup');

var app = express();

app.use((req, res, next) => {
  console.log(`A página ${req.path} foi acessada`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).send(
    'Página não encontrada - 404 Not Found. <a href="/">Voltar</a>'
  );
});

module.exports = app;