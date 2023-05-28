const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Drama' },
    { id: 6, name: 'Thriller' },
    { id: 7, name: 'Sci-Fi' },
    { id: 8, name: 'Fantasy' },
    { id: 9, name: 'Mystery' },
    { id: 10, name: 'Crime' },
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = { id: genres.length + 1, name: req.body.name };
    genres.push(genre);
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('Genre with given ID was not found.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('Genre with given ID was not found.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
});


const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

module.exports = router;