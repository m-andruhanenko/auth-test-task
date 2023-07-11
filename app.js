const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const db = require('./models');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const {
  NOT_FOUND,
  SERVER_ERROR,
} = require('./constants/responseStatuses');

const app = express();
db.createDbInstance();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || SERVER_ERROR);
  res.render('error');
});

module.exports = app;
