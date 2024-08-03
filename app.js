// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

// Import Mongoose schema
require('./app_api/models/trips'); // Ensure you have moved the model file

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const contactRouter = require('./app_server/routes/contact');
const aboutRouter = require('./app_server/routes/about');

// Import API routes
const apiRouter = require('./app_api/routes/index');

const { logRequest, logError } = require('./logger');

// Connect to MongoDB
const dbURI = 'mongodb://127.0.0.1/travlr';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views', 'pages'));
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

// Use custom logging middleware
app.use(logRequest);

// Register a helper function to format dates
hbs.registerHelper('formatDate', function(date) {
    if (!date) return 'N/A';
    
    // Use JavaScript Date methods for formatting
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Use routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);

// API routes
app.use('/api', apiRouter); // Wire-up API routes

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(logError);
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');  // Ensure this points to the correct path in 'views/pages'
});

module.exports = app;
