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
	const { owner, name, category, size, location, image } = req.body;
	db.client.query(
      `INSERT INTO clothes(owner, name, category, size, location, image) VALUES('${owner}', '${name}', '${category}', 
      '${size}', '${location}', '${image}');`,
      () => {
        res.json({status: 'insert clothes success'});
        res.end();
      });
});

module.exports = router;
