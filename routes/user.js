const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/:user', (req, res) => {
  const username = req.params.user;
  db.client.query(
    `SELECT * From users WHERE username = '${username}'`,
    (err, result) => {
      res.json(result.rows);
    });
});

router.post('/', (req, res) => {
  const { username, password, type } = req.body;
  db.client.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, result) => {
      if(result.rows.length > 0) {
        if(result.rows[0].password !== password) {
          res.json({status: 'wrong password'});
          res.end();
        } else {
          res.json({data: result.rows[0], status: 'login success'});
          res.end();
        }
      } else {
        db.client.query(
          `INSERT INTO users(username, password, type) VALUES('${username}', '${password}', '${type}')`,
          () => {
            res.json({status: 'register success'});
            res.end();
          });
      }
    });
});

router.put('/', (req, res) => {
  const { username, password, email, zipCode, phone } = req.body;

  db.client.query(
    `UPDATE users SET username = '${username}',password = '${password}',email = '${email}', zipcode='${zipCode}',phone='${phone}' WHERE username = '${username}';`,
    (err, result) => {
      res.json({profile: 'updated'});
      res.end();
    });
});

module.exports = router;
