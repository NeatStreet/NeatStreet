const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const user = require('./routes/user');
const clothes = require('./routes/clothes');
const app = express();

app.use(bodyParser.json({limit: '300kb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// static routes
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/api/v1/user', user);
app.use('/api/v1/clothes', clothes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at ${port}`);
});
