const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB-exercises...'))
    .catch(err => console.error('Could not connect to MongoDB-exercises...', err));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    title: String,
    content: String,
})

const Course = mongoose.model('Course', courseSchema);

const getCourses = async () => {
    const courses = await Course
        .find({ tags: { $in: ['backend'] } })
        .sort({ title: 1 })
        .select({ title: 1, content: 1 });
    console.log(courses);
}

getCourses();