const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');


router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    res.send(user);
});

module.exports = router;