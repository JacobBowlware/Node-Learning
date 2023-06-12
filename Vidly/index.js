const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')(); // Put this first so that we can catch errors from other startup modules
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Server is running on port ${port}...`);
});