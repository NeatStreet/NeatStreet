const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  db.client.query(
    `SELECT * From clothes`,
    (err, result) => {
      res.json(result.rows);
      res.end();
    });
});

router.get('/:category', (req, res) => {
  const category = req.params.category;
  db.client.query(
    `SELECT * From clothes WHERE category = '${category}'`,
    (err, result) => {
      res.json(result.rows);
      res.end();
    });
});

router.get('/:user', (req, res) => {
  const username = req.params.user;
  db.client.query(
    `SELECT * From clothes WHERE owner = '${username}'`,
    (err, result) => {
      res.json({data: result.rows[0]});
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

router.delete('/', (req, res) => {
  const { name, owner } = req.body;
  db.client.query(
    `DELETE FROM clothes WHERE name = '${name}' AND owner = '${owner}';`,
    () => {
      res.json({status: 'delete clothes success'});
      res.end();
    });
});

module.exports = router;
