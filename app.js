const path = require("path")
const express = require("express")

const createError = require("http-errors")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const passport = require('passport')
const auth = require('./autenticacao');

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

const pizzasRouter = require("./routes/pizzas")
const promocoesRouter = require('./routes/promocoes')
const combosRouter = require('./routes/combos')

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser("secret"))

// app.use(
//   session({
//     name: "secret",
//     secret: "secret",
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore()
//   })
// )

app.use(express.static(path.join(__dirname, "public")))

app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pizzas', pizzasRouter);
app.use('/promocoes', promocoesRouter);
app.use('/combos', combosRouter);

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

app.listen('4000', () => {
  console.log('Porta 3000')
})

module.exports = app;
