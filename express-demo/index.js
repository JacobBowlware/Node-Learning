const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json()); // Add middleware to parse json objects in the body of the request

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
    res.send([1, 2, 3]);
});

/**
 * GET request to get a course with a given id
 */
app.get('/api/courses/:id', (req, res) => {

    // Get course with given id
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        res.status(404).send('The course with the given ID was not found.'); // 404
    res.send(course);
});


/**
 * POST request to create a new course
 */
app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    // Return the course to the client (convention)
    res.send(course);
});






const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});