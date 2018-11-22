const express = require('express');
const bodyParser = require('body-parser')

const path = require('path');
const pg = require('pg');

const db = require('./db');
const book = require('./routes/book');
const user = require('./routes/user');
const techsuite = require('./routes/techsuite');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// static routes
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/book', book);
app.use('/user', user);
app.use ('/techsuite', techsuite);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening at ${port}`);
});
