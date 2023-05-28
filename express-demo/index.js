const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // Default

app.use(express.json()); // Add middleware to parse json objects in the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// // Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger.log);
app.use(logger.auth);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});