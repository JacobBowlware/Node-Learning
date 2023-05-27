const express = require('express');
const Joi = require('joi');

const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

app.get('/api/genres', (req, res) => {
    res.send(genres);
});


const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}