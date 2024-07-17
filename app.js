const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));

// Add extensive debug logging
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  next();
});

// Use routes
app.use('/', (req, res, next) => {
  console.log('Accessing indexRouter');
  next();
}, indexRouter);

app.use('/travel', (req, res, next) => {
  console.log('Accessing travelRouter');
  next();
}, travelRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 Error - Page not found');
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  console.log(`Error: ${err.message}`);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
