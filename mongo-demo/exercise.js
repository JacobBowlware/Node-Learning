const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB-exercises...'))
    .catch(err => console.error('Could not connect to MongoDB-exercises...', err));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    title: { type: String, required: true, minlength: 5, maxlength: 255 },
    content: {
        type: String,
        required: function () { return this.title === 'Angular'; },
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            }
        },
        message: 'A course should have at least one tag.'
    },
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    isPublished: { type: Boolean, required: true },
})

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
    const course = new Course({
        title: 'Angular',
        tags: ['frontend'],
        content: 'This is the content of the Angular course',
        price: 15,
        category: '-',
        isPublished: null
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

const getCourses = async () => {
    const courses = await Course
        .find({ tags: { $in: ['frontend', 'backend'] } })
        .or([{ price: { $gte: 15 } }])
        .sort({ price: -1 })
        .select({ title: 1, content: 1, price: 1 });
    console.log(courses);
}

const updateCourse = async (id) => {
    try {
        const result = await Course.updateOne({ _id: id }, {
            $set: {
                content: "Wow this content"
            }
        }, { new: true }) // Could also use {isPublished: false} instead of id or something similar

        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

const removeCourse = async (id) => {
    const result = await Course.deleteOne({ _id: id }) // Could also use {isPublished: false} instead of id or something similar
    console.log(result);
}

createCourse();