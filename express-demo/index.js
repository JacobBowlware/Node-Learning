const Joi = require('joi');
const config = require('config');
const logger = require('./logger');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // Add middleware to parse json objects in the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger.log);
app.use(logger.auth);
app.use(helmet());
app.use(morgan('tiny'));

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

/**
 * GET request, basic.
 */
app.get('/', (req, res) => {
    res.send('Hello World');
});

/**
 * GET request to get all courses
 */
app.get('/api/courses', (req, res) => {
    // Get list of courses from database, then send it back to client

    // Dummy data
    res.send(courses);
});

/**
 * GET request to get a course with a given id
 */
app.get('/api/courses/:id', (req, res) => {

    // Get course with given id
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send('The course with the given ID was not found.'); // 404
    res.send(course);
});


/**
 * POST request to create a new course
 */
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    // Return the course to the client (convention)
    res.send(course);
});

/**
 * PUT request to update a course
 */
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send('The course with the given ID was not found.'); // 404


    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);


    // Update course
    course.name = req.body.name;

    res.send(course);
});

/**
 * DELETE request to delete a course
 */
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send('The course with the given ID was not found.'); // 404


    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});