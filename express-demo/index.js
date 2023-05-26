const express = require('express');
const app = express();

// app.get()
// app.post()
// app.put()
// app.delete()

// url, callback
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    // Get list of courses from database, then send it back to client

    // Dummy data
    res.send([1, 2, 3]);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});