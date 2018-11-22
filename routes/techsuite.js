const express = require('express');
const bodyParser = require('body-parser')
const moment = require('moment')

const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  console.log("Received techsuite list request")
  if (true) {
    db.client.query(
      //`SELECT * From techsuite WHERE roomnumber = '${roomnumber}'`,
      `SELECT * From techsuite`,
      (err, result) => {
        res.json(result.rows)
        console.log(result.rows)
      }
    )
  }
});

// techsuite reservation
router.post('/reserve', (req, res) => {
  console.log('creating techsuitereserve')

  const { roomnumber, username } = req.body

  db.client.query(
    // edit techsuitereserve table, count the queue, return the queue
    `INSERT INTO techreserve(roomnumber,username,requesttime) VALUES('${roomnumber}','${username}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`,
    (err, result) => {
      if (err) throw err
      db.client.query(
        `SELECT roomnumber, count(*) as queue FROM techreserve WHERE roomnumber = '${roomnumber}' GROUP BY roomnumber`,
        (err, result) => {
          res.json({ position: result.rows[0].queue })
        }
      )
    }
  )
})

router.delete('/reserve', (req, res) => {
  const { techreserveId } = req.body
  db.client.query(
    `DELETE FROM techreserve WHERE techreserveid = ${techreserveId}`,
    (err, result) => {
      res.json({ deleted: true })
    }
  )
})

// router.get('/reserve', (req, res) => {
//   const { roomnumber } = req.query
//   db.client.query(
//     `SELECT * FROM techreserve WHERE roomnumber = '${roomnumber}'`, (err, result) => {
//       if (err) throw err
//       res.json(result.rows)
//     }
//   )
// })

router.post('/techsuiteuse', (req, res) => {
  const { techreserveId } = req.body

  db.client.query(
    console.log('querying techsuites')
    `SELECT * FROM techreserve WHERE techreserveid = ${techreserveId}`,
    (err, result) => {
      console.log('delete reserve:\n',result.row[0])
      const { techreserveid, roomnumber, username } = result.rows[0]
      db.client.query(
        `DELETE FROM techreserve WHERE techreserveid = ${techreserveId}`,
        (err, result) => {
          db.client.query(
            `INSERT INTO reserveaction(roomnumber,username,checkin) VALUES('${roomnumber}','${username}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`,
            (err, result) => {
              if (err) throw err
              res.json({ success: true })
            }
          )
        }
      )
    }
  )
})

router.delete('/techsuiteuse', (req, res) => {
  const { roomnumber } = req.body
  db.client.query(
    `DELETE FROM reserveaction WHERE roomnumber = '${roomnumber}'`,
    (err, result) => {
      res.json({ deleted: true })
    }
  )
})

router.get('/techreservations', (req, res) => {
  db.client.query(
    `SELECT * FROM reserveaction`,
    (err, result) => {
      res.json(result.rows)
    }
  )
})

module.exports = router;
