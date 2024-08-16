const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require('passport'); // Import passport for authentication

// Import Mongoose schema
require('./app_server/models/trips');

// Import DotEnv Config
require('dotenv').config();

// Import Passport Configuration
require('./app_api/config/passport'); 

require('./app_api/models/user'); // Register the User model

// Import routers
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const contactRouter = require('./app_server/routes/contact');
const aboutRouter = require('./app_server/routes/about');
const apiRouter = require('./app_api/routes/index');

// Import custom logging middleware
const { logRequest, logError } = require('./logger');

// Import and connect to MongoDB
require('./app_api/models/db');

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

// Enable CORS
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views', 'pages'));
app.set('view engine', 'hbs');

// Register handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize()); // Initialize Passport for authentication

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "message": err.name + ": " + err.message });
    } else {
        next(err); // Pass on to the error handler if it's not an UnauthorizedError
    }
});

// Use custom logging middleware
app.use(logRequest);

// Use routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/api', apiRouter);

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
