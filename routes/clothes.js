const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  db.client.query(
    `SELECT * From clothes`,
    (err, result) => {
      res.json(result.rows[0]);
      res.end();
    });
});

router.post('/', (req, res) => {
});

module.exports = router;
