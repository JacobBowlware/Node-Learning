const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

router.get('/', (req, res) => {
    // Get list of courses from database, then send it back to client

    // Dummy data
    res.send(courses);
});

/**
 * GET request to get a course with a given id
 */
router.get('/:id', (req, res) => {

    // Get course with given id
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send('The course with the given ID was not found.'); // 404
    res.send(course);
});


/**
 * POST request to create a new course
 */
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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


module.exports = router;