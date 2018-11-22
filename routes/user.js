const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    const { username } = req.query;
    res.json(req.query)
})

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    // console.log(username+password);
    db.client.query(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
        (err, result) => {
            // console.log(result.rows[0].type)
            res.json(result.rows)
        }
    )
})

module.exports = router;
