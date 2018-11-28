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

router.get('/owner/:user', (req, res) => {
  const username = req.params.user;
  db.client.query(
    `SELECT * From clothes WHERE owner = '${username}'`,
    (err, result) => {
      res.json({data: result.rows});
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

router.delete('/:owner/:name', (req, res) => {
  const owner = req.params.owner;
  const name = req.params.name;
  db.client.query(
    `DELETE FROM clothes WHERE name = '${name}' AND owner = '${owner}';`,
    (err) => {
      res.json({status: 'delete clothes success'});
      res.end();
    });
});

module.exports = router;
