const mongoose = require('mongoose')
const Pizza = require('./models/pizza')
const url = 'mongodb://localhost:27017/pizzaPlace'

mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('conectado ao mongodb ')
  }).catch(console.log)

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let pizzaRouter = require('./routes/pizzas');
let promocaoRouter = require('./routes/promocoes');
let comboRouter = require('./routes/combos');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/promocoes', promocaoRouter);
app.use('/combos', comboRouter);

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

app.listen('3000', () => {
  console.log('Porta 3000')
})

module.exports = app;
